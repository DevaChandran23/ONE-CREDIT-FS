import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const WorkoutDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Workout Details - Fitness Challenge Community</title>
        <meta name="description" content="View detailed workout information and progress." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-12 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Workout Details
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Coming soon! View detailed workout information and track your progress.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WorkoutDetailPage;
