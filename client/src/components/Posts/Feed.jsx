import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { postService } from '../../services/postService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import CreatePost from './CreatePost';
import Post from './Post';
import { motion } from 'framer-motion';

const Feed = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: posts = [], isLoading, error, refetch } = useQuery(
    'posts',
    () => postService.getPosts(user?.token),
    {
      enabled: !!user?.token,
      refetchOnWindowFocus: false,
    }
  );

  const handlePostCreated = () => {
    refetch();
  };

  const handleLike = (postId, isLiked) => {
    // Optimistically update the UI
    queryClient.setQueryData('posts', (oldData) => {
      return oldData.map((post) => {
        if (post._id === postId) {
          const likeIds = (post.likes || []).map((l) => (l?._id ?? l));
          return {
            ...post,
            likes: isLiked 
              ? [...likeIds, user._id]
              : likeIds.filter((id) => id !== user._id)
          };
        }
        return post;
      });
    });
  };

  const handleDelete = async (postId) => {
    try {
      await postService.deletePost(postId, user.token);
      // Remove the post from the cache
      queryClient.setQueryData('posts', (oldData) => 
        oldData.filter(post => post._id !== postId)
      );
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const handleFollow = async (userId, isFollowing) => {
    // Update the UI optimistically
    queryClient.setQueryData('posts', (oldData) => {
      return oldData.map(post => {
        if (post.user._id === userId) {
          return {
            ...post,
            user: {
              ...post.user,
              followers: isFollowing
                ? [...(post.user.followers || []), user._id]
                : (post.user.followers || []).filter(id => id !== user._id)
            }
          };
        }
        return post;
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading posts. Please try again later.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No posts yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Be the first to share something with the community!
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Post 
                post={post} 
                onLike={handleLike}
                onDelete={handleDelete}
                onFollow={handleFollow}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Feed;
