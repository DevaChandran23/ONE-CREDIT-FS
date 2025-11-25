const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// @route   PUT /api/users/:id/follow
// @desc    Follow a user
// @access  Private
router.put('/:id/follow', auth, async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const alreadyFollowing = targetUser.followers.some(
      (f) => f.toString() === req.user.id.toString()
    );
    if (alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: 'Already following this user'
      });
    }

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: req.user.id }
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { following: targetUserId }
    });

    const updatedTarget = await User.findById(targetUserId)
      .select('username profilePicture followers');

    res.json({
      success: true,
      message: 'Followed user successfully',
      data: { user: updatedTarget }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while following user',
      error: error.message
    });
  }
});

// @route   PUT /api/users/:id/unfollow
// @desc    Unfollow a user
// @access  Private
router.put('/:id/unfollow', auth, async (req, res) => {
  try {
    const targetUserId = req.params.id;

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: req.user.id }
    });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: targetUserId }
    });

    const updatedTarget = await User.findById(targetUserId)
      .select('username profilePicture followers');

    res.json({
      success: true,
      message: 'Unfollowed user successfully',
      data: { user: updatedTarget }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while unfollowing user',
      error: error.message
    });
  }
});

// @route   GET /api/users/:id/following
// @desc    Get list of users current user is following
// @access  Private
router.get('/:id/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following', 'username profilePicture');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { following: user.following }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching following list',
      error: error.message
    });
  }
});

module.exports = router;
