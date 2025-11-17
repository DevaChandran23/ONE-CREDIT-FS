const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/progress
// @desc    Get user progress (placeholder)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Progress route working',
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
