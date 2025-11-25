const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  image: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
postSchema.index({ content: 'text' });

// Virtual for post URL
postSchema.virtual('url').get(function() {
  return `/api/posts/${this._id}`;
});

// Add a method to check if a user has liked the post
postSchema.methods.hasLiked = function(userId) {
  return this.likes.some(likeId => likeId.toString() === userId.toString());
};

// Add a method to toggle like
postSchema.methods.toggleLike = function(userId) {
  const index = this.likes.findIndex(id => id.toString() === userId.toString());
  
  if (index === -1) {
    // Add like
    this.likes.push(userId);
    return true; // Return true if like was added
  } else {
    // Remove like
    this.likes.splice(index, 1);
    return false; // Return false if like was removed
  }
};

// Add a method to add a comment
postSchema.methods.addComment = function(userId, content) {
  this.comments.unshift({
    user: userId,
    content
  });
  
  // Keep only the 100 most recent comments
  if (this.comments.length > 100) {
    this.comments = this.comments.slice(0, 100);
  }
  
  return this.comments[0];
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
