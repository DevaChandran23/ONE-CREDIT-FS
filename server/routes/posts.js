const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const {
  getPosts,
  createPost,
  likePost,
  deletePost,
  addComment
} = require('../controllers/postController');

// Get all posts
router.get('/', auth, getPosts);

// Create a new post
router.post('/', auth, upload.single('image'), handleUploadError, createPost);

// Like/Unlike a post
router.put('/:id/like', auth, likePost);

// Delete a post
router.delete('/:id', auth, deletePost);

// Add comment to a post
router.post('/:id/comments', auth, addComment);

module.exports = router;
