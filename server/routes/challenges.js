const express = require('express');
const Challenge = require('../models/Challenge');
const { auth, optionalAuth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/challenges
// @desc    Get all challenges with filtering and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      category,
      difficulty,
      status = 'active',
      page = 1,
      limit = 10,
      sort = '-createdAt',
      search
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    // Handle status filtering
    const now = new Date();
    if (status === 'active') {
      filter.startDate = { $lte: now };
      filter.endDate = { $gte: now };
    } else if (status === 'upcoming') {
      filter.startDate = { $gt: now };
    } else if (status === 'completed') {
      filter.endDate = { $lt: now };
    }

    // Handle search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with population
    const challenges = await Challenge.find(filter)
      .populate('creator', 'username firstName lastName profilePicture')
      .populate('participants.user', 'username firstName lastName profilePicture')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Challenge.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        challenges,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          hasNext: skip + challenges.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching challenges',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/challenges/:id
// @desc    Get single challenge by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('creator', 'username firstName lastName profilePicture')
      .populate('participants.user', 'username firstName lastName profilePicture')
      .populate('discussions.user', 'username firstName lastName profilePicture')
      .populate('discussions.replies.user', 'username firstName lastName profilePicture');

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    res.json({
      success: true,
      data: { challenge }
    });

  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   POST /api/challenges
// @desc    Create a new challenge
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const challengeData = {
      ...req.body,
      creator: req.user.id
    };

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'difficulty', 'type', 'endDate'];
    for (const field of requiredFields) {
      if (!challengeData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Set duration if not provided
    if (!challengeData.duration) {
      const start = new Date(challengeData.startDate || Date.now());
      const end = new Date(challengeData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) {
        challengeData.duration = { value: diffDays, unit: 'days' };
      } else if (diffDays <= 60) {
        challengeData.duration = { value: Math.ceil(diffDays / 7), unit: 'weeks' };
      } else {
        challengeData.duration = { value: Math.ceil(diffDays / 30), unit: 'months' };
      }
    }

    const challenge = new Challenge(challengeData);
    await challenge.save();

    // Populate creator info for response
    await challenge.populate('creator', 'username firstName lastName profilePicture');

    res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      data: { challenge }
    });

  } catch (error) {
    console.error('Create challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/challenges/:id
// @desc    Update a challenge
// @access  Private (Creator only)
router.put('/:id', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Check if user is the creator
    if (challenge.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only the creator can update this challenge'
      });
    }

    // Update challenge
    Object.assign(challenge, req.body);
    await challenge.save();

    await challenge.populate('creator', 'username firstName lastName profilePicture');

    res.json({
      success: true,
      message: 'Challenge updated successfully',
      data: { challenge }
    });

  } catch (error) {
    console.error('Update challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   DELETE /api/challenges/:id
// @desc    Delete a challenge
// @access  Private (Creator only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Check if user is the creator
    if (challenge.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only the creator can delete this challenge'
      });
    }

    await Challenge.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Challenge deleted successfully'
    });

  } catch (error) {
    console.error('Delete challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   POST /api/challenges/:id/join
// @desc    Join a challenge
// @access  Private
router.post('/:id/join', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Check if challenge is active and joinable
    if (!challenge.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Challenge is not active'
      });
    }

    const now = new Date();
    if (now > challenge.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Challenge has already ended'
      });
    }

    try {
      await challenge.addParticipant(req.user.id);
      
      res.json({
        success: true,
        message: 'Successfully joined the challenge',
        data: { challenge }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }

  } catch (error) {
    console.error('Join challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while joining challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   POST /api/challenges/:id/leave
// @desc    Leave a challenge
// @access  Private
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    await challenge.removeParticipant(req.user.id);
    
    res.json({
      success: true,
      message: 'Successfully left the challenge'
    });

  } catch (error) {
    console.error('Leave challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while leaving challenge',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   POST /api/challenges/:id/checkin
// @desc    Check in to a challenge with progress
// @access  Private
router.post('/:id/checkin', auth, async (req, res) => {
  try {
    const { progress, notes, photos } = req.body;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: 'Progress must be between 0 and 100'
      });
    }

    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Check if user is a participant
    const isParticipant = challenge.participants.some(
      p => p.user.toString() === req.user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'You must join the challenge first'
      });
    }

    await challenge.addCheckin(req.user.id, progress, notes, photos);
    await challenge.updateProgress(req.user.id, progress);

    res.json({
      success: true,
      message: 'Check-in recorded successfully',
      data: { challenge }
    });

  } catch (error) {
    console.error('Challenge checkin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while recording check-in',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/challenges/:id/leaderboard
// @desc    Get challenge leaderboard
// @access  Public
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('participants.user', 'username firstName lastName profilePicture')
      .select('participants title');

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Sort participants by progress
    const leaderboard = challenge.participants
      .sort((a, b) => b.progress - a.progress)
      .map((participant, index) => ({
        rank: index + 1,
        user: participant.user,
        progress: participant.progress,
        status: participant.status,
        joinedAt: participant.joinedAt,
        lastActivity: participant.lastActivity
      }));

    res.json({
      success: true,
      data: {
        challengeTitle: challenge.title,
        leaderboard
      }
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
