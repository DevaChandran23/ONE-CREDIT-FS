const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'male',
  fitnessGoal: 'weight-loss',
  experienceLevel: 'beginner'
};

async function testSignup() {
  try {
    console.log('🧪 Testing user registration...');
    const response = await axios.post(`${BASE_URL}/auth/register`, testUser);
    
    if (response.data.success) {
      console.log('✅ Registration successful!');
      console.log('User ID:', response.data.data.user._id);
      console.log('Token received:', response.data.data.token ? 'Yes' : 'No');
      return response.data.data.token;
    }
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already registered')) {
      console.log('ℹ️  User already exists, proceeding to login test...');
      return null;
    }
    console.error('❌ Registration failed:', error.response?.data?.message || error.message);
    return null;
  }
}

async function testLogin() {
  try {
    console.log('🧪 Testing user login...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    
    if (response.data.success) {
      console.log('✅ Login successful!');
      console.log('User ID:', response.data.data.user._id);
      console.log('Token received:', response.data.data.token ? 'Yes' : 'No');
      return response.data.data.token;
    }
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return null;
  }
}

async function testProtectedRoute(token) {
  try {
    console.log('🧪 Testing protected route (/auth/me)...');
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ Protected route access successful!');
      console.log('User name:', response.data.data.user.fullName);
      return true;
    }
  } catch (error) {
    console.error('❌ Protected route access failed:', error.response?.data?.message || error.message);
    return false;
  }
}

async function testHealthCheck() {
  try {
    console.log('🧪 Testing server health...');
    const response = await axios.get(`${BASE_URL}/health`);
    
    if (response.data.status === 'OK') {
      console.log('✅ Server is healthy!');
      return true;
    }
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting authentication tests...\n');
  
  // Test server health first
  const isHealthy = await testHealthCheck();
  if (!isHealthy) {
    console.log('❌ Server is not running. Please start the server first.');
    return;
  }
  
  console.log('');
  
  // Test registration
  let token = await testSignup();
  console.log('');
  
  // Test login
  if (!token) {
    token = await testLogin();
  }
  console.log('');
  
  // Test protected route
  if (token) {
    await testProtectedRoute(token);
  }
  
  console.log('\n🏁 Tests completed!');
}

// Run tests
runTests().catch(console.error);
