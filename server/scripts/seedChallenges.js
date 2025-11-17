const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { weightLossChallenge, muscleGainChallenge } = require('../data/challengeSeeds');
require('dotenv').config();

const seedChallenges = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-community', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Find or create a default admin user to be the creator
    let adminUser = await User.findOne({ email: 'admin@fitnesschallenge.com' });
    
    if (!adminUser) {
      adminUser = new User({
        username: 'fitnessadmin',
        email: 'admin@fitnesschallenge.com',
        password: 'AdminPass123!',
        firstName: 'Fitness',
        lastName: 'Admin',
        fitnessLevel: 'expert',
        fitnessGoals: ['general-fitness'],
        isVerified: true
      });
      await adminUser.save();
      console.log('✅ Created admin user');
    }

    // Clear existing challenges (optional - remove if you want to keep existing ones)
    await Challenge.deleteMany({});
    console.log('🗑️ Cleared existing challenges');

    // Prepare challenge data with creator ID and dates
    const now = new Date();
    const weightLossData = {
      ...weightLossChallenge,
      creator: adminUser._id,
      startDate: now,
      endDate: new Date(now.getTime() + (8 * 7 * 24 * 60 * 60 * 1000)), // 8 weeks from now
      isFeatured: true
    };

    const muscleGainData = {
      ...muscleGainChallenge,
      creator: adminUser._id,
      startDate: now,
      endDate: new Date(now.getTime() + (12 * 7 * 24 * 60 * 60 * 1000)), // 12 weeks from now
      isFeatured: true
    };

    // Create challenges
    const createdWeightLoss = await Challenge.create(weightLossData);
    const createdMuscleGain = await Challenge.create(muscleGainData);

    console.log('✅ Created Weight Loss Challenge:', createdWeightLoss.title);
    console.log('✅ Created Muscle Gain Challenge:', createdMuscleGain.title);

    // Create additional sample challenges for variety
    const additionalChallenges = [
      {
        title: "30-Day Flexibility Challenge",
        description: "Improve your flexibility and mobility with daily stretching routines designed for all levels.",
        creator: adminUser._id,
        category: "flexibility",
        difficulty: "beginner",
        type: "monthly",
        startDate: now,
        endDate: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)),
        duration: { value: 30, unit: "days" },
        maxParticipants: 200,
        tags: ["flexibility", "mobility", "stretching", "beginner"],
        goals: [
          {
            title: "Daily Stretching",
            description: "Complete 15 minutes of stretching daily",
            target: { value: 30, unit: "days" }
          }
        ],
        rules: [
          "Complete at least 15 minutes of stretching daily",
          "Focus on different muscle groups each day",
          "Hold each stretch for 30-60 seconds"
        ],
        expertTips: [
          {
            category: "workout",
            tip: "Never stretch cold muscles - do a light warm-up first",
            author: "Emma Davis, Yoga Instructor"
          }
        ]
      },
      {
        title: "Couch to 5K Running Challenge",
        description: "Go from couch potato to running a 5K in just 8 weeks with this progressive running program.",
        creator: adminUser._id,
        category: "cardio",
        difficulty: "beginner",
        type: "custom",
        startDate: now,
        endDate: new Date(now.getTime() + (8 * 7 * 24 * 60 * 60 * 1000)),
        duration: { value: 8, unit: "weeks" },
        maxParticipants: 150,
        tags: ["running", "cardio", "endurance", "beginner", "5k"],
        goals: [
          {
            title: "Complete 5K Run",
            description: "Run 5 kilometers without stopping",
            target: { value: 5, unit: "kilometers" }
          }
        ],
        rules: [
          "Follow the progressive running schedule",
          "Run 3 times per week",
          "Don't skip rest days",
          "Listen to your body"
        ],
        expertTips: [
          {
            category: "workout",
            tip: "Start slow and focus on time rather than speed",
            author: "Tom Wilson, Running Coach"
          }
        ]
      },
      {
        title: "Core Strength Bootcamp",
        description: "Build a rock-solid core with this intensive 6-week program focusing on all aspects of core strength.",
        creator: adminUser._id,
        category: "strength",
        difficulty: "intermediate",
        type: "custom",
        startDate: now,
        endDate: new Date(now.getTime() + (6 * 7 * 24 * 60 * 60 * 1000)),
        duration: { value: 6, unit: "weeks" },
        maxParticipants: 75,
        tags: ["core", "strength", "abs", "intermediate", "bootcamp"],
        goals: [
          {
            title: "Plank Hold",
            description: "Hold a plank for 3 minutes",
            target: { value: 180, unit: "seconds" }
          }
        ],
        rules: [
          "Complete core workouts 4 times per week",
          "Focus on proper form over speed",
          "Progress gradually each week"
        ],
        expertTips: [
          {
            category: "workout",
            tip: "Your core includes more than just abs - train all planes of movement",
            author: "Alex Chen, Functional Movement Specialist"
          }
        ]
      }
    ];

    // Create additional challenges
    for (const challengeData of additionalChallenges) {
      const challenge = await Challenge.create(challengeData);
      console.log('✅ Created Challenge:', challenge.title);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📊 Total challenges created: ${additionalChallenges.length + 2}`);
    
    // Display summary
    const totalChallenges = await Challenge.countDocuments();
    console.log(`📈 Total challenges in database: ${totalChallenges}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seed function
if (require.main === module) {
  seedChallenges();
}

module.exports = seedChallenges;
