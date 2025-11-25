import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

// Get all posts
const getPosts = async (token) => {
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  const response = await axios.get(API_URL, config);
  return response.data?.data || [];
};

// Create a new post
const createPost = async (postData, token) => {
  const headers = token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'multipart/form-data' };
  const config = { headers };
  const response = await axios.post(API_URL, postData, config);
  return response.data?.data;
};

// Like a post
const likePost = async (postId, token) => {
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  const response = await axios.put(`${API_URL}/${postId}/like`, {}, config);
  return response.data?.data;
};

// Delete a post
const deletePost = async (postId, token) => {
  const config = {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
  const response = await axios.delete(`${API_URL}/${postId}`, config);
  return response.data?.data;
};

export const postService = {
  getPosts,
  createPost,
  likePost,
  deletePost,
};
