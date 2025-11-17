import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  Target,
  Flame,
  Filter,
  Search,
  ChevronDown,
  Star,
  Bookmark,
  Share2,
  MoreVertical,
  Zap,
  Heart,
  TrendingUp
} from 'lucide-react';
import WorkoutSessionModal from '../../components/WorkoutSession/WorkoutSessionModal';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIntensity, setSelectedIntensity] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  // Sample workouts data
  const sampleWorkouts = [
    {
      id: 1,
      title: "Morning Cardio Blast",
      description: "High-energy cardio workout to start your day with energy and burn calories efficiently.",
      type: "cardio",
      intensity: "high",
      duration: 45,
      calories: 450,
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "15 sec" },
        { name: "Mountain Climbers", sets: 3, reps: "45 sec", rest: "20 sec" },
        { name: "Burpees", sets: 3, reps: "20 reps", rest: "30 sec" },
        { name: "High Knees", sets: 3, reps: "60 sec", rest: "20 sec" }
      ],
      equipment: ["None"],
      difficulty: "intermediate",
      rating: 4.7,
      reviews: 89,
      completed: 156,
      isCompleted: false,
      isFavorite: true,
      date: "2024-01-20",
      time: "07:00",
      location: "Home Gym",
      weather: "Sunny",
      mood: "Energetic",
      energyLevel: "High",
      notes: "Great morning energy boost! Felt strong throughout.",
      tags: ["Morning", "Cardio", "High Intensity", "No Equipment"]
    },
    {
      id: 2,
      title: "Upper Body Strength",
      description: "Comprehensive upper body workout targeting chest, back, shoulders, and arms with progressive overload.",
      type: "strength",
      intensity: "medium",
      duration: 60,
      calories: 380,
      exercises: [
        { name: "Push-ups", sets: 4, reps: "12-15 reps", rest: "90 sec" },
        { name: "Pull-ups", sets: 4, reps: "8-10 reps", rest: "120 sec" },
        { name: "Dumbbell Rows", sets: 3, reps: "12 reps each arm", rest: "60 sec" },
        { name: "Shoulder Press", sets: 3, reps: "10 reps", rest: "90 sec" },
        { name: "Bicep Curls", sets: 3, reps: "15 reps", rest: "60 sec" }
      ],
      equipment: ["Dumbbells", "Pull-up Bar"],
      difficulty: "intermediate",
      rating: 4.8,
      reviews: 124,
      completed: 234,
      isCompleted: true,
      isFavorite: false,
      date: "2024-01-19",
      time: "18:30",
      location: "Gym",
      weather: "Cloudy",
      mood: "Focused",
      energyLevel: "Medium",
      notes: "Good form on pull-ups. Need to increase weight on shoulder press.",
      tags: ["Strength", "Upper Body", "Progressive Overload", "Gym"]
    },
    {
      id: 3,
      title: "Yoga Flow for Flexibility",
      description: "Gentle yoga sequence focusing on flexibility, balance, and mindfulness. Perfect for recovery days.",
      type: "flexibility",
      intensity: "low",
      duration: 30,
      calories: 120,
      exercises: [
        { name: "Sun Salutation A", sets: 3, reps: "Full sequence", rest: "30 sec" },
        { name: "Warrior Poses", sets: 1, reps: "Hold each pose 30 sec", rest: "15 sec" },
        { name: "Forward Folds", sets: 1, reps: "Hold 45 sec each", rest: "20 sec" },
        { name: "Savasana", sets: 1, reps: "5 minutes", rest: "None" }
      ],
      equipment: ["Yoga Mat"],
      difficulty: "beginner",
      rating: 4.6,
      reviews: 67,
      completed: 89,
      isCompleted: false,
      isFavorite: true,
      date: "2024-01-18",
      time: "20:00",
      location: "Home",
      weather: "Clear",
      mood: "Calm",
      energyLevel: "Low",
      notes: "Perfect evening routine. Felt very relaxed and flexible.",
      tags: ["Yoga", "Flexibility", "Recovery", "Mindfulness"]
    },
    {
      id: 4,
      title: "HIIT Circuit Training",
      description: "High-intensity interval training with short rest periods to maximize fat burning and cardiovascular fitness.",
      type: "hiit",
      intensity: "high",
      duration: 35,
      calories: 520,
      exercises: [
        { name: "Squat Jumps", sets: 4, reps: "30 sec", rest: "15 sec" },
        { name: "Push-up Burpees", sets: 4, reps: "45 sec", rest: "20 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "15 sec" },
        { name: "Plank Jacks", sets: 4, reps: "45 sec", rest: "20 sec" }
      ],
      equipment: ["None"],
      difficulty: "advanced",
      rating: 4.9,
      reviews: 156,
      completed: 445,
      isCompleted: false,
      isFavorite: false,
      date: "2024-01-17",
      time: "17:00",
      location: "Outdoor Park",
      weather: "Partly Cloudy",
      mood: "Motivated",
      energyLevel: "High",
      notes: "Intense but rewarding. Need to work on endurance.",
      tags: ["HIIT", "High Intensity", "Fat Burning", "Outdoor"]
    },
    {
      id: 5,
      title: "Lower Body Power",
      description: "Explosive lower body workout focusing on power, strength, and athletic performance.",
      type: "strength",
      intensity: "high",
      duration: 55,
      calories: 420,
      exercises: [
        { name: "Barbell Squats", sets: 5, reps: "5 reps", rest: "180 sec" },
        { name: "Deadlifts", sets: 4, reps: "6 reps", rest: "180 sec" },
        { name: "Box Jumps", sets: 3, reps: "8 reps", rest: "90 sec" },
        { name: "Lunges", sets: 3, reps: "12 reps each leg", rest: "60 sec" }
      ],
      equipment: ["Barbell", "Weight Plates", "Box"],
      difficulty: "advanced",
      rating: 4.7,
      reviews: 89,
      completed: 178,
      isCompleted: false,
      isFavorite: true,
      date: "2024-01-16",
      time: "19:00",
      location: "Gym",
      weather: "Rainy",
      mood: "Determined",
      energyLevel: "High",
      notes: "Strong on squats. Need to focus on deadlift form.",
      tags: ["Strength", "Lower Body", "Power", "Athletic"]
    },
    {
      id: 6,
      title: "Recovery Stretch",
      description: "Light stretching and mobility work to aid recovery and maintain flexibility between intense workouts.",
      type: "recovery",
      intensity: "low",
      duration: 25,
      calories: 80,
      exercises: [
        { name: "Dynamic Stretching", sets: 1, reps: "10 reps each", rest: "None" },
        { name: "Foam Rolling", sets: 1, reps: "5 min total", rest: "None" },
        { name: "Static Stretches", sets: 1, reps: "Hold 30 sec each", rest: "15 sec" },
        { name: "Deep Breathing", sets: 1, reps: "5 minutes", rest: "None" }
      ],
      equipment: ["Foam Roller", "Yoga Mat"],
      difficulty: "beginner",
      rating: 4.5,
      reviews: 45,
      completed: 123,
      isCompleted: true,
      isFavorite: false,
      date: "2024-01-15",
      time: "21:00",
      location: "Home",
      weather: "Clear",
      mood: "Relaxed",
      energyLevel: "Low",
      notes: "Felt much better after stretching. Good recovery session.",
      tags: ["Recovery", "Stretching", "Mobility", "Relaxation"]
    }
  ];

  // Initialize workouts on component mount
  useEffect(() => {
    setWorkouts(sampleWorkouts);
    setFilteredWorkouts(sampleWorkouts);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = workouts.filter(workout => {
      const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workout.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || workout.type === selectedType;
      const matchesIntensity = selectedIntensity === 'all' || workout.intensity === selectedIntensity;
      
      let matchesDuration = true;
      if (selectedDuration !== 'all') {
        const duration = workout.duration;
        switch (selectedDuration) {
          case 'short':
            matchesDuration = duration <= 30;
            break;
          case 'medium':
            matchesDuration = duration > 30 && duration <= 60;
            break;
          case 'long':
            matchesDuration = duration > 60;
            break;
          default:
            matchesDuration = true;
        }
      }
      
      return matchesSearch && matchesType && matchesIntensity && matchesDuration;
    });

    // Sort filtered workouts
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        filtered.sort((a, b) => b.completed - a.completed);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'calories':
        filtered.sort((a, b) => b.calories - a.calories);
        break;
      default:
        break;
    }

    setFilteredWorkouts(filtered);
  }, [workouts, searchTerm, selectedType, selectedIntensity, selectedDuration, sortBy]);

  const handleStartWorkout = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutModal(true);
  };

  const handleWorkoutComplete = (workoutId) => {
    // Update workout completion status
    setWorkouts(prev => prev.map(w => 
      w.id === workoutId ? { ...w, isCompleted: true, completed: w.completed + 1 } : w
    ));
    setShowWorkoutModal(false);
    setSelectedWorkout(null);
  };

  const toggleFavorite = (workoutId) => {
    setWorkouts(prev => prev.map(w => 
      w.id === workoutId ? { ...w, isFavorite: !w.isFavorite } : w
    ));
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'cardio': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'strength': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'flexibility': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'hiit': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'recovery': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20';
      case 'endurance': return 'text-teal-600 bg-teal-100 dark:bg-teal-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>Workouts - Fitness Community</title>
        <meta name="description" content="Discover and track your fitness workouts with our comprehensive workout library." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Workouts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover and track your fitness journey with our comprehensive workout library
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="recovery">Recovery</option>
                  <option value="endurance">Endurance</option>
                </select>
              </div>

              {/* Intensity Filter */}
              <div>
                <select
                  value={selectedIntensity}
                  onChange={(e) => setSelectedIntensity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Intensities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (≤30 min)</option>
                  <option value="medium">Medium (30-60 min)</option>
                  <option value="long">Long (>60 min)</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Workout Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {workout.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {workout.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(workout.id)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${workout.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>

                  {/* Workout Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.duration}m
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.calories} cal
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.exercises.length} exercises
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.rating} ({workout.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(workout.type)}`}>
                      {workout.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityColor(workout.intensity)}`}>
                      {workout.intensity}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                      {workout.difficulty}
                    </span>
                  </div>

                  {/* Equipment */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Equipment: {workout.equipment.join(', ')}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStartWorkout(workout)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorkouts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No workouts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Workout Session Modal */}
      <WorkoutSessionModal
        isOpen={showWorkoutModal}
        onClose={() => {
          setShowWorkoutModal(false);
          setSelectedWorkout(null);
        }}
        workout={selectedWorkout}
        onWorkoutComplete={handleWorkoutComplete}
      />
    </>
  );
};

export default WorkoutsPage;
