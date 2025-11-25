import React, { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, UserPlus, UserCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { postService } from '../../services/postService';
import { userService } from '../../services/userService';
import { toast } from 'react-hot-toast';

const Post = ({ post, onLike, onDelete, onFollow }) => {
  const { user: currentUser, token } = useAuth();
  const [isLiked, setIsLiked] = useState(
    Array.isArray(post.likes) && post.likes.some((l) => (l?._id ?? l) === currentUser?._id)
  );
  const [isFollowing, setIsFollowing] = useState(post.user?.followers?.includes(currentUser?._id) || false);
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = async () => {
    try {
      await postService.likePost(post._id, token);
      setIsLiked(!isLiked);
      onLike && onLike(post._id, !isLiked);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to like post');
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await userService.unfollowUser(post.user._id, token);
      } else {
        await userService.followUser(post.user._id, token);
      }
      setIsFollowing(!isFollowing);
      onFollow && onFollow(post.user._id, !isFollowing);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to follow user');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={post.user?.profilePicture || '/default-avatar.png'} 
            alt={post.user?.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{post.user?.username}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              {post.user?._id === currentUser?._id ? (
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  Delete Post
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img 
              src={`${(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000')}${post.image.startsWith('/public') ? post.image : `/public${post.image}`}`}
              alt="Post content" 
              className="w-full h-auto max-h-96 object-contain bg-gray-100 dark:bg-gray-700"
            />
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes?.length || 0}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
