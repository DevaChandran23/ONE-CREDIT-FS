import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Feed from '../../components/Posts/Feed';

const CommunityPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Helmet>
        <title>Community | Fitness Challenge</title>
        <meta name="description" content="Connect with other fitness enthusiasts, share your progress, and get inspired" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Community Feed
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              Connect with other fitness enthusiasts, share your progress, and get inspired
            </p>
          </div>

          {isAuthenticated ? (
            <Feed />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join the Community</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign in to view and share posts with other fitness enthusiasts.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/login"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default CommunityPage;
