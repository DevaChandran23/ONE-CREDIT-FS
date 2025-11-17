const express = require('express');
const WorkoutSession = require('../models/WorkoutSession');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/workout-sessions/start
// @desc    Start a new workout session
// @access  Private
router.post('/start', auth, async (req, res) => {
  try {
    const { workoutId, workoutTitle, exercises } = req.body;

    if (!workoutId || !workoutTitle || !exercises) {
      return res.status(400).json({
        success: false,
        message: 'Workout ID, title, and exercises are required'
      });
    }

    // Check if user has an active session
    const activeSession = await WorkoutSession.findOne({
      user: req.user.id,
      status: 'in-progress'
    });

    if (activeSession) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active workout session',
        data: { activeSession }
      });
    }

    // Create exercise progress structure
    const exerciseProgress = exercises.map((exercise, index) => ({
      exerciseIndex: index,
      exerciseName: exercise.name,
      sets: Array.from({ length: exercise.sets || 1 }, (_, setIndex) => ({
        setNumber: setIndex + 1,
        completed: false
      })),
      completed: false
    }));

    const session = new WorkoutSession({
      user: req.user.id,
      workoutId,
      workoutTitle,
      exerciseProgress,
      startTime: new Date()
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: 'Workout session started successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Start workout session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while starting workout session',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/workout-sessions/active
// @desc    Get user's active workout session
// @access  Private
router.get('/active', auth, async (req, res) => {
  try {
    const session = await WorkoutSession.findOne({
      user: req.user.id,
      status: 'in-progress'
    }).populate('user', 'username firstName lastName');

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'No active workout session found'
      });
    }

    res.json({
      success: true,
      data: { session }
    });

  } catch (error) {
    console.error('Get active session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching active session',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/workout-sessions/:id/exercise/:exerciseIndex/set/:setIndex
// @desc    Complete a set in the workout
// @access  Private
router.put('/:id/exercise/:exerciseIndex/set/:setIndex', auth, async (req, res) => {
  try {
    const { id, exerciseIndex, setIndex } = req.params;
    const { reps, weight, duration, restTime } = req.body;

    const session = await WorkoutSession.findOne({
      _id: id,
      user: req.user.id,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Active workout session not found'
      });
    }

    await session.completeSet(parseInt(exerciseIndex), parseInt(setIndex), {
      reps: reps || 0,
      weight: weight || 0,
      duration: duration || 0,
      restTime: restTime || 0
    });

    res.json({
      success: true,
      message: 'Set completed successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Complete set error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing set',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/workout-sessions/:id/exercise/:exerciseIndex/complete
// @desc    Complete an exercise in the workout
// @access  Private
router.put('/:id/exercise/:exerciseIndex/complete', auth, async (req, res) => {
  try {
    const { id, exerciseIndex } = req.params;
    const { notes } = req.body;

    const session = await WorkoutSession.findOne({
      _id: id,
      user: req.user.id,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Active workout session not found'
      });
    }

    await session.completeExercise(parseInt(exerciseIndex));

    if (notes) {
      session.exerciseProgress[parseInt(exerciseIndex)].notes = notes;
      await session.save();
    }

    res.json({
      success: true,
      message: 'Exercise completed successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Complete exercise error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing exercise',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/workout-sessions/:id/complete
// @desc    Complete the entire workout session
// @access  Private
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, rating, difficulty, caloriesBurned } = req.body;

    const session = await WorkoutSession.findOne({
      _id: id,
      user: req.user.id,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Active workout session not found'
      });
    }

    await session.completeWorkout({
      notes,
      rating,
      difficulty,
      caloriesBurned
    });

    res.json({
      success: true,
      message: 'Workout completed successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Complete workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing workout',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/workout-sessions/:id/pause
// @desc    Pause the workout session
// @access  Private
router.put('/:id/pause', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const session = await WorkoutSession.findOneAndUpdate(
      { _id: id, user: req.user.id, status: 'in-progress' },
      { status: 'paused' },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Active workout session not found'
      });
    }

    res.json({
      success: true,
      message: 'Workout paused successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Pause workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while pausing workout',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   PUT /api/workout-sessions/:id/resume
// @desc    Resume the workout session
// @access  Private
router.put('/:id/resume', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const session = await WorkoutSession.findOneAndUpdate(
      { _id: id, user: req.user.id, status: 'paused' },
      { status: 'in-progress' },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Paused workout session not found'
      });
    }

    res.json({
      success: true,
      message: 'Workout resumed successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Resume workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resuming workout',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   DELETE /api/workout-sessions/:id
// @desc    Cancel the workout session
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const session = await WorkoutSession.findOneAndUpdate(
      { _id: id, user: req.user.id, status: { $in: ['in-progress', 'paused'] } },
      { status: 'cancelled', endTime: new Date() },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Active workout session not found'
      });
    }

    res.json({
      success: true,
      message: 'Workout cancelled successfully',
      data: { session }
    });

  } catch (error) {
    console.error('Cancel workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling workout',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/workout-sessions/history
// @desc    Get user's workout session history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const sessions = await WorkoutSession.find(filter)
      .sort({ startTime: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('user', 'username firstName lastName');

    const total = await WorkoutSession.countDocuments(filter);

    res.json({
      success: true,
      data: {
        sessions,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          hasNext: (parseInt(page) * parseInt(limit)) < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get workout history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching workout history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
