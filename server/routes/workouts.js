const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/workouts
// @desc    Get all workouts (placeholder)
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Workouts route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
