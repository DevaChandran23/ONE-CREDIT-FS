const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Exercise name is required'],
        trim: true
    },
    category: {
        type: String,
        enum: [
            'strength',
            'cardio',
            'flexibility',
            'balance',
            'sports',
            'functional',
            'other'
        ],
        required: true
    },
    muscleGroups: [{
        type: String,
        enum: [
            'chest',
            'back',
            'shoulders',
            'biceps',
            'triceps',
            'forearms',
            'abs',
            'obliques',
            'lower-back',
            'glutes',
            'quadriceps',
            'hamstrings',
            'calves',
            'full-body'
        ]
    }],
    sets: [{
        reps: {
            type: Number,
            min: 0
        },
        weight: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' }
        },
        duration: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['seconds', 'minutes'], default: 'seconds' }
        },
        distance: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['km', 'miles', 'm', 'ft'], default: 'km' }
        },
        restTime: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['seconds', 'minutes'], default: 'seconds' }
        },
        notes: String,
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    totalVolume: {
        type: Number,
        default: 0
    },
    personalBest: {
        reps: Number,
        weight: {
            value: Number,
            unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' }
        },
        duration: {
            value: Number,
            unit: { type: String, enum: ['seconds', 'minutes'], default: 'seconds' }
        },
        distance: {
            value: Number,
            unit: { type: String, enum: ['km', 'miles', 'm', 'ft'], default: 'km' }
        }
    }
});

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Workout title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    type: {
        type: String,
        required: [true, 'Workout type is required'],
        enum: [
            'strength-training',
            'cardio',
            'hiit',
            'yoga',
            'pilates',
            'crossfit',
            'running',
            'cycling',
            'swimming',
            'walking',
            'sports',
            'functional',
            'flexibility',
            'recovery',
            'custom'
        ]
    },
    intensity: {
        type: String,
        enum: ['low', 'moderate', 'high', 'very-high'],
        required: true
    },
    duration: {
        planned: {
            value: { type: Number, min: 1 },
            unit: { type: String, enum: ['minutes', 'hours'], default: 'minutes' }
        },
        actual: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['minutes', 'hours'], default: 'minutes' }
        }
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    startTime: Date,
    endTime: Date,
    location: {
        type: String,
        trim: true
    },
    weather: {
        temperature: Number,
        condition: String,
        humidity: Number
    },
    exercises: [exerciseSchema],
    warmup: {
        duration: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['minutes', 'seconds'], default: 'minutes' }
        },
        exercises: [String]
    },
    cooldown: {
        duration: {
            value: { type: Number, min: 0 },
            unit: { type: String, enum: ['minutes', 'seconds'], default: 'minutes' }
        },
        exercises: [String]
    },
    caloriesBurned: {
        estimated: Number,
        actual: Number
    },
    heartRate: {
        average: Number,
        max: Number,
        min: Number
    },
    mood: {
        type: String,
        enum: ['excellent', 'good', 'okay', 'poor', 'terrible']
    },
    energyLevel: {
        before: {
            type: Number,
            min: 1,
            max: 10
        },
        after: {
            type: Number,
            min: 1,
            max: 10
        }
    },
    difficulty: {
        type: String,
        enum: ['very-easy', 'easy', 'moderate', 'hard', 'very-hard']
    },
    satisfaction: {
        type: Number,
        min: 1,
        max: 10
    },
    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    photos: [{
        url: String,
        caption: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    tags: [String],
    isCompleted: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    challenges: [{
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Challenge'
        },
        progress: {
            type: Number,
            min: 0,
            max: 100
        }
    }],
    equipment: [{
        name: String,
        isAvailable: {
            type: Boolean,
            default: true
        }
    }],
    injuries: [{
        bodyPart: String,
        severity: {
            type: String,
            enum: ['mild', 'moderate', 'severe']
        },
        notes: String
    }],
    nutrition: {
        preWorkout: {
            meal: String,
            timing: Number, // minutes before workout
            calories: Number
        },
        postWorkout: {
            meal: String,
            timing: Number, // minutes after workout
            calories: Number
        },
        hydration: {
            before: Number, // ml
            during: Number, // ml
            after: Number // ml
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for total workout time
workoutSchema.virtual('totalTime').get(function() {
    if (this.startTime && this.endTime) {
        return (this.endTime - this.startTime) / (1000 * 60); // in minutes
    }
    return this.duration.actual ? .value || 0;
});

// Virtual for total volume
workoutSchema.virtual('totalVolume').get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.totalVolume;
    }, 0);
});

// Virtual for workout efficiency
workoutSchema.virtual('efficiency').get(function() {
    if (!this.duration.planned ? .value || !this.duration.actual ? .value) return null;

    const planned = this.duration.planned.value;
    const actual = this.duration.actual.value;

    if (this.duration.planned.unit === 'hours') planned *= 60;
    if (this.duration.actual.unit === 'hours') actual *= 60;

    return Math.round((planned / actual) * 100);
});

// Indexes
workoutSchema.index({ user: 1, date: -1 });
workoutSchema.index({ type: 1, date: -1 });
workoutSchema.index({ intensity: 1, date: -1 });
workoutSchema.index({ 'exercises.muscleGroups': 1 });

// Pre-save middleware to calculate total volume
workoutSchema.pre('save', function(next) {
    this.exercises.forEach(exercise => {
        exercise.totalVolume = exercise.sets.reduce((total, set) => {
            let volume = 0;
            if (set.reps && set.weight ? .value) {
                volume = set.reps * set.weight.value;
            } else if (set.duration ? .value) {
                volume = set.duration.value;
            } else if (set.distance ? .value) {
                volume = set.distance.value;
            }
            return total + volume;
        }, 0);
    });
    next();
});

// Method to add exercise
workoutSchema.methods.addExercise = function(exerciseData) {
    this.exercises.push(exerciseData);
    return this.save();
};

// Method to complete workout
workoutSchema.methods.completeWorkout = function(endTime, actualDuration, notes) {
    this.endTime = endTime || new Date();
    this.duration.actual = actualDuration;
    this.notes = notes || this.notes;
    this.isCompleted = true;
    return this.save();
};

// Method to add photo
workoutSchema.methods.addPhoto = function(url, caption) {
this.photos.push({
    url,
    caption: caption || '',
    timestamp: new Date()
});
return this.save();
});

// Static method to find workouts by date range
workoutSchema.statics.findByDateRange = function(userId, startDate, endDate) {
    return this.find({
        user: userId,
        date: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ date: -1 });
};

// Static method to find workouts by type
workoutSchema.statics.findByType = function(userId, type) {
    return this.find({ user: userId, type }).sort({ date: -1 });
};

// Static method to find personal bests
workoutSchema.statics.findPersonalBests = function(userId) {
    return this.aggregate([
        { $match: { user: mongoose.Types.ObjectId(userId) } },
        { $unwind: '$exercises' },
        {
            $group: {
                _id: '$exercises.name',
                maxReps: { $max: '$exercises.sets.reps' },
                maxWeight: { $max: '$exercises.sets.weight.value' },
                maxDuration: { $max: '$exercises.sets.duration.value' },
                maxDistance: { $max: '$exercises.sets.distance.value' }
            }
        }
    ]);
};

module.exports = mongoose.model('Workout', workoutSchema);