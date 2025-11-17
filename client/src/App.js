import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout/Layout';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ChallengesPage from './pages/Challenges/ChallengesPage';
import ChallengeDetailPage from './pages/Challenges/ChallengeDetailPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import WorkoutDetailPage from './pages/Workouts/WorkoutDetailPage';
import ProfilePage from './pages/Profile/ProfilePage';
import CommunityPage from './pages/Community/CommunityPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Styles
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                <Navbar />
                
                <Layout>
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route 
                        path="/" 
                        element={
                          <motion.div
                            key="home"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <HomePage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/login" 
                        element={
                          <motion.div
                            key="login"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <LoginPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/register" 
                        element={
                          <motion.div
                            key="register"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <RegisterPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/dashboard" 
                        element={
                          <motion.div
                            key="dashboard"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <DashboardPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/challenges" 
                        element={
                          <motion.div
                            key="challenges"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <ChallengesPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/challenges/:id" 
                        element={
                          <motion.div
                            key="challenge-detail"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <ChallengeDetailPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/workouts" 
                        element={
                          <motion.div
                            key="workouts"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <WorkoutsPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/workouts/:id" 
                        element={
                          <motion.div
                            key="workout-detail"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <WorkoutDetailPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/profile" 
                        element={
                          <motion.div
                            key="profile"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <ProfilePage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="/community" 
                        element={
                          <motion.div
                            key="community"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <CommunityPage />
                          </motion.div>
                        } 
                      />
                      
                      <Route 
                        path="*" 
                        element={
                          <motion.div
                            key="not-found"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <NotFoundPage />
                          </motion.div>
                        } 
                      />
                    </Routes>
                  </AnimatePresence>
                </Layout>
                
                <Footer />
                
                {/* Toast notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#22c55e',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 5000,
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
