import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Follow a user
const followUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${userId}/follow`, {}, config);
  return response.data;
};

// Unfollow a user
const unfollowUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${userId}/unfollow`, {}, config);
  return response.data;
};

// Get user's following
const getFollowing = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${userId}/following`, config);
  return response.data;
};

export const userService = {
  followUser,
  unfollowUser,
  getFollowing,
};
