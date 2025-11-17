import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Square,
  Clock,
  CheckCircle,
  SkipForward,
  Timer,
  Target,
  Flame,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  Award,
  Star,
  X,
  Plus,
  Minus,
  Info,
  Zap
} from 'lucide-react';

const WorkoutSessionModal = ({ 
  isOpen, 
  onClose, 
  workout, 
  onWorkoutComplete 
}) => {
  const [sessionState, setSessionState] = useState('ready'); // ready, active, paused, resting, completed
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showExerciseInfo, setShowExerciseInfo] = useState(false);
  
  // Form states for tracking sets
  const [currentReps, setCurrentReps] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentDuration, setCurrentDuration] = useState('');

  useEffect(() => {
    if (isOpen && workout) {
      initializeWorkout();
    }
    return () => {
      if (workoutTimer > 0) {
        clearInterval(workoutTimer);
      }
      if (restTimer > 0) {
        clearInterval(restTimer);
      }
    };
  }, [isOpen, workout]);

  useEffect(() => {
    let interval = null;
    if (sessionState === 'active') {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    } else if (sessionState === 'resting' && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setSessionState('active');
            playSound('rest-complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState, restTimer]);

  const initializeWorkout = () => {
    const progress = workout.exercises.map((exercise, index) => ({
      exerciseIndex: index,
      exerciseName: exercise.name,
      sets: Array.from({ length: exercise.sets || 1 }, (_, setIndex) => ({
        setNumber: setIndex + 1,
        reps: 0,
        weight: 0,
        duration: 0,
        completed: false
      })),
      completed: false
    }));
    
    setExerciseProgress(progress);
    setCurrentExerciseIndex(0);
    setCurrentSetIndex(0);
    setWorkoutTimer(0);
    setRestTimer(0);
    setSessionState('ready');
  };

  const startWorkout = async () => {
    try {
      const response = await fetch('/api/workout-sessions/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          workoutId: workout.id.toString(),
          workoutTitle: workout.title,
          exercises: workout.exercises
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSessionData(data.data.session);
        setSessionState('active');
        playSound('workout-start');
      }
    } catch (error) {
      console.error('Error starting workout:', error);
    }
  };

  const pauseWorkout = () => {
    setSessionState('paused');
    playSound('pause');
  };

  const resumeWorkout = () => {
    setSessionState('active');
    playSound('resume');
  };

  const completeSet = async () => {
    if (!sessionData) return;

    const setData = {
      reps: parseInt(currentReps) || 0,
      weight: parseFloat(currentWeight) || 0,
      duration: parseInt(currentDuration) || 0
    };

    try {
      const response = await fetch(
        `/api/workout-sessions/${sessionData._id}/exercise/${currentExerciseIndex}/set/${currentSetIndex}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(setData)
        }
      );

      if (response.ok) {
        // Update local state
        const newProgress = [...exerciseProgress];
        newProgress[currentExerciseIndex].sets[currentSetIndex] = {
          ...newProgress[currentExerciseIndex].sets[currentSetIndex],
          ...setData,
          completed: true
        };
        setExerciseProgress(newProgress);

        // Clear form
        setCurrentReps('');
        setCurrentWeight('');
        setCurrentDuration('');

        // Move to next set or exercise
        moveToNextSet();
        playSound('set-complete');
      }
    } catch (error) {
      console.error('Error completing set:', error);
    }
  };

  const moveToNextSet = () => {
    const currentExercise = workout.exercises[currentExerciseIndex];
    const totalSets = currentExercise.sets || 1;

    if (currentSetIndex < totalSets - 1) {
      // Move to next set
      setCurrentSetIndex(prev => prev + 1);
      startRestTimer();
    } else {
      // Move to next exercise
      completeExercise();
    }
  };

  const completeExercise = async () => {
    if (!sessionData) return;

    try {
      await fetch(
        `/api/workout-sessions/${sessionData._id}/exercise/${currentExerciseIndex}/complete`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update local state
      const newProgress = [...exerciseProgress];
      newProgress[currentExerciseIndex].completed = true;
      setExerciseProgress(newProgress);

      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSetIndex(0);
        startRestTimer();
      } else {
        completeWorkout();
      }

      playSound('exercise-complete');
    } catch (error) {
      console.error('Error completing exercise:', error);
    }
  };

  const completeWorkout = async () => {
    if (!sessionData) return;

    try {
      await fetch(`/api/workout-sessions/${sessionData._id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          caloriesBurned: workout.calories,
          rating: 5,
          difficulty: 'just-right'
        })
      });

      setSessionState('completed');
      playSound('workout-complete');
      
      if (onWorkoutComplete) {
        onWorkoutComplete(workout.id);
      }
    } catch (error) {
      console.error('Error completing workout:', error);
    }
  };

  const startRestTimer = () => {
    const currentExercise = workout.exercises[currentExerciseIndex];
    const restTime = parseRestTime(currentExercise.rest || '60 sec');
    setRestTimer(restTime);
    setSessionState('resting');
  };

  const parseRestTime = (restString) => {
    const match = restString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 60;
  };

  const skipRest = () => {
    setRestTimer(0);
    setSessionState('active');
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
      'workout-start': 440,
      'set-complete': 523,
      'exercise-complete': 659,
      'workout-complete': 880,
      'rest-complete': 392,
      'pause': 330,
      'resume': 440
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type] || 440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentExercise = () => workout?.exercises[currentExerciseIndex];
  const getCurrentSet = () => exerciseProgress[currentExerciseIndex]?.sets[currentSetIndex];
  const getCompletedSets = () => exerciseProgress[currentExerciseIndex]?.sets.filter(set => set.completed).length || 0;
  const getTotalSets = () => getCurrentExercise()?.sets || 1;
  const getWorkoutProgress = () => {
    const totalExercises = workout?.exercises.length || 1;
    const completedExercises = exerciseProgress.filter(ex => ex.completed).length;
    const currentProgress = currentExerciseIndex / totalExercises;
    return Math.round((completedExercises + currentProgress) * 100 / totalExercises);
  };

  if (!isOpen || !workout) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && sessionState === 'ready' && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{workout.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatTime(workoutTimer)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{getWorkoutProgress()}% Complete</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{workout.calories} cal</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                {sessionState === 'ready' && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Workout Ready State */}
            {sessionState === 'ready' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Start?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {workout.description}
                  </p>
                  
                  {/* Workout Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                      <div className="font-semibold">{workout.duration}m</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                      <div className="font-semibold">{workout.calories}</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
                      <div className="font-semibold">{workout.exercises.length}</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Intensity</div>
                      <div className="font-semibold capitalize">{workout.intensity}</div>
                    </div>
                  </div>

                  {/* Exercise List Preview */}
                  <div className="text-left mb-8">
                    <h4 className="text-lg font-semibold mb-4">Exercises:</h4>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div>
                            <span className="font-medium">{exercise.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                              {exercise.sets} sets × {exercise.reps}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{exercise.rest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={startWorkout}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center mx-auto"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Workout
                </button>
              </motion.div>
            )}

            {/* Active Workout State */}
            {(sessionState === 'active' || sessionState === 'paused') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Progress Bar */}
                <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getWorkoutProgress()}%` }}
                  />
                </div>

                {/* Current Exercise */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {getCurrentExercise()?.name}
                    </h3>
                    <button
                      onClick={() => setShowExerciseInfo(!showExerciseInfo)}
                      className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {showExerciseInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Instructions:</strong> Focus on proper form and controlled movements. 
                        Keep your core engaged throughout the exercise.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Target Muscles:</strong> Primary muscle groups being worked
                      </p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Set</span>
                      <div className="text-2xl font-bold">
                        {currentSetIndex + 1} / {getTotalSets()}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Exercise</span>
                      <div className="text-2xl font-bold">
                        {currentExerciseIndex + 1} / {workout.exercises.length}
                      </div>
                    </div>
                  </div>

                  {/* Set Input Form */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Reps
                      </label>
                      <input
                        type="number"
                        value={currentReps}
                        onChange={(e) => setCurrentReps(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700"
                        placeholder={getCurrentExercise()?.reps || "0"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700"
                        placeholder="0"
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Duration (sec)
                      </label>
                      <input
                        type="number"
                        value={currentDuration}
                        onChange={(e) => setCurrentDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {sessionState === 'active' ? (
                      <>
                        <button
                          onClick={completeSet}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Complete Set
                        </button>
                        <button
                          onClick={pauseWorkout}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                          <Pause className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={resumeWorkout}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Resume
                      </button>
                    )}
                  </div>
                </div>

                {/* Completed Sets */}
                {getCompletedSets() > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                      Completed Sets ({getCompletedSets()})
                    </h4>
                    <div className="space-y-2">
                      {exerciseProgress[currentExerciseIndex]?.sets
                        .filter(set => set.completed)
                        .map((set, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>Set {set.setNumber}</span>
                            <span>{set.reps} reps × {set.weight}lbs</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Rest State */}
            {sessionState === 'resting' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
                  <Timer className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Rest Time
                  </h3>
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {formatTime(restTimer)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Take a breather and prepare for the next set
                  </p>
                  <button
                    onClick={skipRest}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Skip Rest
                  </button>
                </div>
              </motion.div>
            )}

            {/* Completed State */}
            {sessionState === 'completed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl">
                  <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Workout Complete!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Great job! You've completed your workout.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
                      <div className="font-semibold">{formatTime(workoutTimer)}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                      <div className="font-semibold">{workout.calories}</div>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    Finish
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkoutSessionModal;
