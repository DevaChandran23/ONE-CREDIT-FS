const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Challenge title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Challenge description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Challenge category is required'],
        enum: [
            'weight-loss',
            'muscle-gain',
            'endurance',
            'flexibility',
            'strength',
            'cardio',
            'general-fitness',
            'sport-specific',
            'wellness',
            'nutrition'
        ]
    },
    difficulty: {
        type: String,
        required: [true, 'Challenge difficulty is required'],
        enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    type: {
        type: String,
        required: [true, 'Challenge type is required'],
        enum: ['daily', 'weekly', 'monthly', 'custom']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    duration: {
        value: { type: Number, required: true },
        unit: { type: String, enum: ['days', 'weeks', 'months'], required: true }
    },
    maxParticipants: {
        type: Number,
        min: [1, 'Minimum 1 participant required'],
        max: [10000, 'Maximum 10000 participants allowed']
    },
    currentParticipants: {
        type: Number,
        default: 0
    },
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'dropped'],
            default: 'active'
        },
        lastActivity: {
            type: Date,
            default: Date.now
        }
    }],
    goals: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        target: {
            value: { type: Number, required: true },
            unit: { type: String, required: true }
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    rules: [{
        type: String,
        maxlength: [200, 'Rule cannot exceed 200 characters']
    }],
    rewards: {
        badges: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Badge'
        }],
        points: {
            type: Number,
            default: 0
        },
        customRewards: [String]
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [String],
    image: {
        type: String,
        default: ''
    },
    leaderboard: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        score: {
            type: Number,
            default: 0
        },
        rank: {
            type: Number,
            default: 0
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }],
    statistics: {
        totalCheckins: {
            type: Number,
            default: 0
        },
        averageProgress: {
            type: Number,
            default: 0
        },
        completionRate: {
            type: Number,
            default: 0
        }
    },
    checkins: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        notes: String,
        photos: [String]
    }],
    workoutPlan: {
        weeks: [{
            weekNumber: { type: Number, required: true },
            days: [{
                dayNumber: { type: Number, required: true },
                dayName: { type: String, required: true },
                restDay: { type: Boolean, default: false },
                exercises: [{
                    name: { type: String, required: true },
                    category: { type: String, enum: ['cardio', 'strength', 'flexibility', 'core', 'hiit'], required: true },
                    sets: { type: Number },
                    reps: { type: String },
                    duration: { type: String },
                    restBetweenSets: { type: String },
                    instructions: { type: String },
                    targetMuscles: [String],
                    equipment: [String],
                    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
                }],
                totalDuration: { type: String },
                caloriesBurned: { type: Number },
                notes: { type: String }
            }]
        }]
    },
    nutritionPlan: {
        dailyCalories: { type: Number },
        macros: {
            protein: { type: Number }, // grams
            carbs: { type: Number },   // grams
            fats: { type: Number }     // grams
        },
        mealPlans: [{
            day: { type: Number, required: true },
            meals: [{
                type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
                name: { type: String, required: true },
                ingredients: [String],
                calories: { type: Number },
                protein: { type: Number },
                carbs: { type: Number },
                fats: { type: Number },
                instructions: { type: String },
                prepTime: { type: String }
            }]
        }],
        supplements: [{
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            timing: { type: String, required: true },
            purpose: { type: String }
        }],
        hydrationGoal: { type: Number }, // liters per day
        nutritionTips: [String]
    },
    progressTracking: {
        metrics: [{
            name: { type: String, required: true },
            unit: { type: String, required: true },
            targetValue: { type: Number },
            frequency: { type: String, enum: ['daily', 'weekly', 'bi-weekly'], required: true }
        }],
        milestones: [{
            week: { type: Number, required: true },
            title: { type: String, required: true },
            description: { type: String },
            reward: { type: String }
        }]
    },
    expertTips: [{
        category: { type: String, enum: ['workout', 'nutrition', 'recovery', 'mindset'], required: true },
        tip: { type: String, required: true },
        author: { type: String, default: 'Fitness Expert' }
    }],
    discussions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true,
            maxlength: [500, 'Message cannot exceed 500 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        replies: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String,
                required: true,
                maxlength: [300, 'Reply cannot exceed 300 characters']
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for challenge status
challengeSchema.virtual('status').get(function() {
    const now = new Date();
    if (now < this.startDate) return 'upcoming';
    if (now > this.endDate) return 'completed';
    return 'active';
});

// Virtual for days remaining
challengeSchema.virtual('daysRemaining').get(function() {
    const now = new Date();
    const end = new Date(this.endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
});

// Virtual for progress percentage
challengeSchema.virtual('progressPercentage').get(function() {
    if (this.participants.length === 0) return 0;
    const totalProgress = this.participants.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / this.participants.length);
});

// Indexes
challengeSchema.index({ category: 1, difficulty: 1, isActive: 1 });
challengeSchema.index({ startDate: 1, endDate: 1 });
challengeSchema.index({ isFeatured: 1, isActive: 1 });
challengeSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to update current participants count
challengeSchema.pre('save', function(next) {
    this.currentParticipants = this.participants.length;
    next();
});

// Method to add participant
challengeSchema.methods.addParticipant = function(userId) {
    if (this.currentParticipants >= this.maxParticipants) {
        throw new Error('Challenge is full');
    }

    if (this.participants.some(p => p.user.toString() === userId.toString())) {
        throw new Error('User is already participating');
    }

    this.participants.push({
        user: userId,
        joinedAt: new Date(),
        progress: 0,
        status: 'active',
        lastActivity: new Date()
    });

    this.currentParticipants = this.participants.length;
    return this.save();
};

// Method to remove participant
challengeSchema.methods.removeParticipant = function(userId) {
    this.participants = this.participants.filter(
        p => p.user.toString() !== userId.toString()
    );
    this.currentParticipants = this.participants.length;
    return this.save();
};

// Method to update participant progress
challengeSchema.methods.updateProgress = function(userId, progress) {
    const participant = this.participants.find(
        p => p.user.toString() === userId.toString()
    );

    if (!participant) {
        throw new Error('User is not participating in this challenge');
    }

    participant.progress = Math.max(0, Math.min(100, progress));
    participant.lastActivity = new Date();

    // Update statistics
    this.statistics.totalCheckins += 1;
    this.statistics.averageProgress = this.participants.reduce(
        (sum, p) => sum + p.progress, 0
    ) / this.participants.length;

    return this.save();
};

// Method to add checkin
challengeSchema.methods.addCheckin = function(userId, progress, notes, photos) {
    const checkin = {
        user: userId,
        date: new Date(),
        progress: progress,
        notes: notes || '',
        photos: photos || []
    };

    this.checkins.push(checkin);
    this.statistics.totalCheckins += 1;

    return this.save();
};

// Method to add discussion
challengeSchema.methods.addDiscussion = function(userId, message) {
    const discussion = {
        user: userId,
        message: message,
        createdAt: new Date(),
        likes: [],
        replies: []
    };

    this.discussions.push(discussion);
    return this.save();
};

// Static method to find active challenges
challengeSchema.statics.findActive = function() {
    const now = new Date();
    return this.find({
        startDate: { $lte: now },
        endDate: { $gte: now },
        isActive: true
    });
};

// Static method to find challenges by category
challengeSchema.statics.findByCategory = function(category) {
    return this.find({ category, isActive: true });
};

// Static method to find challenges by difficulty
challengeSchema.statics.findByDifficulty = function(difficulty) {
    return this.find({ difficulty, isActive: true });
};

module.exports = mongoose.model('Challenge', challengeSchema);