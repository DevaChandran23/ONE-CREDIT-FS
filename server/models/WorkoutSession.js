const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutId: {
    type: String,
    required: true
  },
  workoutTitle: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'paused', 'cancelled'],
    default: 'in-progress'
  },
  currentExerciseIndex: {
    type: Number,
    default: 0
  },
  currentSetIndex: {
    type: Number,
    default: 0
  },
  exerciseProgress: [{
    exerciseIndex: { type: Number, required: true },
    exerciseName: { type: String, required: true },
    sets: [{
      setNumber: { type: Number, required: true },
      reps: { type: Number },
      weight: { type: Number },
      duration: { type: Number }, // in seconds
      restTime: { type: Number }, // in seconds
      completed: { type: Boolean, default: false },
      completedAt: { type: Date }
    }],
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    notes: { type: String }
  }],
  totalDuration: {
    type: Number, // in seconds
    default: 0
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  difficulty: {
    type: String,
    enum: ['too-easy', 'just-right', 'too-hard']
  }
}, {
  timestamps: true
});

// Calculate total duration when session ends
workoutSessionSchema.pre('save', function(next) {
  if (this.endTime && this.startTime) {
    this.totalDuration = Math.floor((this.endTime - this.startTime) / 1000);
  }
  next();
});

// Method to complete current set
workoutSessionSchema.methods.completeSet = function(exerciseIndex, setIndex, setData) {
  const exercise = this.exerciseProgress[exerciseIndex];
  if (exercise && exercise.sets[setIndex]) {
    Object.assign(exercise.sets[setIndex], {
      ...setData,
      completed: true,
      completedAt: new Date()
    });
  }
  return this.save();
};

// Method to complete exercise
workoutSessionSchema.methods.completeExercise = function(exerciseIndex) {
  const exercise = this.exerciseProgress[exerciseIndex];
  if (exercise) {
    exercise.completed = true;
    exercise.completedAt = new Date();
  }
  return this.save();
};

// Method to complete workout
workoutSessionSchema.methods.completeWorkout = function(finalData = {}) {
  this.status = 'completed';
  this.endTime = new Date();
  this.totalDuration = Math.floor((this.endTime - this.startTime) / 1000);
  
  if (finalData.notes) this.notes = finalData.notes;
  if (finalData.rating) this.rating = finalData.rating;
  if (finalData.difficulty) this.difficulty = finalData.difficulty;
  if (finalData.caloriesBurned) this.caloriesBurned = finalData.caloriesBurned;
  
  return this.save();
};

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
