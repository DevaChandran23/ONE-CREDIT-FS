const Post = require('../models/Post');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || '-createdAt';
    
    // Search
    const search = req.query.search ? { $text: { $search: req.query.search } } : {};

    // Get posts with user data populated
    const posts = await Post.find(search)
      .populate('user', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Post.countDocuments(search);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: posts.length,
      page,
      totalPages,
      data: posts
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    // Create post data
    const postData = {
      content,
      user: userId
    };

    // Handle file upload if exists
    if (req.file) {
      postData.image = `/public/uploads/posts/${req.file.filename}`;
    }

    // Create post
    const post = await Post.create(postData);

    // Populate user data
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username profilePicture');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    
    // Delete uploaded file if there was an error
    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (_) {}
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if the post has already been liked
    const isLiked = post.likes.some(
      like => like.toString() === req.user.id
    );

    let updatedPost;
    
    if (isLiked) {
      // Unlike the post
      updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.user.id } },
        { new: true }
      ).populate('user', 'username profilePicture');
    } else {
      // Like the post
      updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: req.user.id } },
        { new: true }
      ).populate('user', 'username profilePicture');
    }

    res.status(200).json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to delete this post' 
      });
    }

    // Delete post image if exists
    if (post.image) {
      const filePath = path.join(__dirname, '../public/uploads/posts', path.basename(post.image));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await post.remove();

    res.status(200).json({ 
      success: true, 
      data: {} 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Create comment
    const comment = {
      user: req.user.id,
      content
    };

    post.comments.unshift(comment);
    await post.save();

    // Populate user data in the comment
    const populatedPost = await Post.findById(post._id)
      .populate('comments.user', 'username profilePicture')
      .populate('user', 'username profilePicture');

    // Get the newly added comment (it's the first one in the array)
    const newComment = populatedPost.comments[0];

    res.status(201).json({
      success: true,
      data: newComment
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
