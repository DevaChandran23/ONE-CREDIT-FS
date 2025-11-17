import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me');
          setUser(response.data.data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { user: userData, token: authToken } = response.data.data;
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      
      toast.success('Welcome back!');
      return true; // Return boolean success value
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Login failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', userData);
      
      const { user: newUser, token: authToken } = response.data.data;
      
      setUser(newUser);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      
      toast.success('Account created successfully! Welcome to the community!');
      return true; // Return boolean success value
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (token) {
        await axios.post('/api/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      toast.success('Logged out successfully');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/auth/me', profileData);
      
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      
      toast.success('Profile updated successfully!');
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Profile update failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      await axios.put('/api/auth/change-password', { currentPassword, newPassword });
      
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Password change failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await axios.post('/api/auth/forgot-password', { email });
      
      toast.success('Password reset instructions sent to your email!');
      return { success: true };
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Password reset request failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (resetToken, newPassword) => {
    try {
      setLoading(true);
      await axios.post('/api/auth/reset-password', { resetToken, newPassword });
      
      toast.success('Password reset successfully! You can now log in with your new password.');
      return { success: true };
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.message || 'Password reset failed. Please try again.';
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  // Check if user has specific role or permission
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user can access specific resource
  const canAccess = (resource, action = 'read') => {
    if (!user) return false;
    
    // Add your permission logic here
    // For now, return true for authenticated users
    return true;
  };

  const value = {
    user,
    loading,
    token,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshUser,
    hasRole,
    canAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};