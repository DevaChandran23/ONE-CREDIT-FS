const mongoose = require('mongoose');

// Weight Loss Challenge - 8 Week Fat Burn
const weightLossChallenge = {
  title: "8-Week Fat Burn Challenge",
  description: "A comprehensive 8-week program designed to help you lose weight through a combination of cardio, strength training, and proper nutrition. Perfect for beginners to intermediate fitness levels.",
  category: "weight-loss",
  difficulty: "intermediate",
  type: "custom",
  duration: { value: 8, unit: "weeks" },
  maxParticipants: 100,
  tags: ["weight-loss", "cardio", "strength", "nutrition", "beginner-friendly"],
  goals: [
    {
      title: "Weight Loss",
      description: "Lose 1-2 pounds per week safely",
      target: { value: 8, unit: "pounds" }
    },
    {
      title: "Body Fat Reduction",
      description: "Reduce body fat percentage",
      target: { value: 5, unit: "percentage" }
    },
    {
      title: "Cardio Endurance",
      description: "Improve cardiovascular fitness",
      target: { value: 30, unit: "minutes continuous" }
    }
  ],
  rules: [
    "Complete at least 5 workouts per week",
    "Follow the nutrition plan guidelines",
    "Track your progress daily",
    "Stay hydrated - drink at least 8 glasses of water daily",
    "Get 7-8 hours of sleep each night"
  ],
  workoutPlan: {
    weeks: [
      {
        weekNumber: 1,
        days: [
          {
            dayNumber: 1,
            dayName: "Monday - Full Body Strength",
            restDay: false,
            exercises: [
              {
                name: "Bodyweight Squats",
                category: "strength",
                sets: 3,
                reps: "12-15",
                restBetweenSets: "60 seconds",
                instructions: "Keep your back straight, lower until thighs are parallel to ground",
                targetMuscles: ["quadriceps", "glutes", "hamstrings"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Push-ups (Modified if needed)",
                category: "strength",
                sets: 3,
                reps: "8-12",
                restBetweenSets: "60 seconds",
                instructions: "Keep body in straight line, lower chest to ground",
                targetMuscles: ["chest", "shoulders", "triceps"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Plank Hold",
                category: "core",
                sets: 3,
                duration: "30-45 seconds",
                restBetweenSets: "60 seconds",
                instructions: "Keep body straight, engage core muscles",
                targetMuscles: ["core", "shoulders"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Walking Lunges",
                category: "strength",
                sets: 3,
                reps: "10 each leg",
                restBetweenSets: "60 seconds",
                instructions: "Step forward, lower back knee toward ground",
                targetMuscles: ["quadriceps", "glutes", "hamstrings"],
                equipment: ["none"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "30 minutes",
            caloriesBurned: 200,
            notes: "Focus on proper form over speed. Rest as needed between exercises."
          },
          {
            dayNumber: 2,
            dayName: "Tuesday - Cardio",
            restDay: false,
            exercises: [
              {
                name: "Brisk Walking/Light Jogging",
                category: "cardio",
                duration: "25 minutes",
                instructions: "Maintain a pace where you can still hold a conversation",
                targetMuscles: ["legs", "cardiovascular system"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Jumping Jacks",
                category: "cardio",
                sets: 3,
                reps: "30 seconds",
                restBetweenSets: "30 seconds",
                instructions: "Land softly, keep core engaged",
                targetMuscles: ["full body", "cardiovascular system"],
                equipment: ["none"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "30 minutes",
            caloriesBurned: 250,
            notes: "Stay hydrated and listen to your body"
          },
          {
            dayNumber: 3,
            dayName: "Wednesday - Active Recovery",
            restDay: false,
            exercises: [
              {
                name: "Gentle Yoga Flow",
                category: "flexibility",
                duration: "20 minutes",
                instructions: "Focus on breathing and gentle stretching",
                targetMuscles: ["full body"],
                equipment: ["yoga mat"],
                difficulty: "beginner"
              },
              {
                name: "Light Walking",
                category: "cardio",
                duration: "15 minutes",
                instructions: "Easy pace, focus on recovery",
                targetMuscles: ["legs"],
                equipment: ["none"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "35 minutes",
            caloriesBurned: 150,
            notes: "Focus on recovery and mobility"
          },
          {
            dayNumber: 4,
            dayName: "Thursday - Upper Body Strength",
            restDay: false,
            exercises: [
              {
                name: "Wall Push-ups",
                category: "strength",
                sets: 3,
                reps: "12-15",
                restBetweenSets: "60 seconds",
                instructions: "Stand arm's length from wall, push against wall",
                targetMuscles: ["chest", "shoulders", "triceps"],
                equipment: ["wall"],
                difficulty: "beginner"
              },
              {
                name: "Arm Circles",
                category: "strength",
                sets: 3,
                reps: "15 each direction",
                restBetweenSets: "30 seconds",
                instructions: "Keep arms straight, make controlled circles",
                targetMuscles: ["shoulders", "arms"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Tricep Dips (Chair)",
                category: "strength",
                sets: 3,
                reps: "8-12",
                restBetweenSets: "60 seconds",
                instructions: "Use sturdy chair, lower body using arms",
                targetMuscles: ["triceps", "shoulders"],
                equipment: ["chair"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "25 minutes",
            caloriesBurned: 180,
            notes: "Focus on controlled movements"
          },
          {
            dayNumber: 5,
            dayName: "Friday - HIIT Cardio",
            restDay: false,
            exercises: [
              {
                name: "High Knees",
                category: "hiit",
                sets: 4,
                duration: "30 seconds",
                restBetweenSets: "30 seconds",
                instructions: "Bring knees up toward chest, pump arms",
                targetMuscles: ["legs", "core", "cardiovascular system"],
                equipment: ["none"],
                difficulty: "intermediate"
              },
              {
                name: "Butt Kicks",
                category: "hiit",
                sets: 4,
                duration: "30 seconds",
                restBetweenSets: "30 seconds",
                instructions: "Kick heels toward glutes, stay on balls of feet",
                targetMuscles: ["hamstrings", "cardiovascular system"],
                equipment: ["none"],
                difficulty: "intermediate"
              },
              {
                name: "Mountain Climbers",
                category: "hiit",
                sets: 4,
                duration: "30 seconds",
                restBetweenSets: "30 seconds",
                instructions: "Plank position, alternate bringing knees to chest",
                targetMuscles: ["core", "shoulders", "legs"],
                equipment: ["none"],
                difficulty: "intermediate"
              }
            ],
            totalDuration: "20 minutes",
            caloriesBurned: 300,
            notes: "Push yourself during work intervals, rest completely during breaks"
          },
          {
            dayNumber: 6,
            dayName: "Saturday - Lower Body & Core",
            restDay: false,
            exercises: [
              {
                name: "Glute Bridges",
                category: "strength",
                sets: 3,
                reps: "15-20",
                restBetweenSets: "60 seconds",
                instructions: "Squeeze glutes at top, control the descent",
                targetMuscles: ["glutes", "hamstrings", "core"],
                equipment: ["none"],
                difficulty: "beginner"
              },
              {
                name: "Wall Sit",
                category: "strength",
                sets: 3,
                duration: "30-45 seconds",
                restBetweenSets: "60 seconds",
                instructions: "Back against wall, thighs parallel to ground",
                targetMuscles: ["quadriceps", "glutes"],
                equipment: ["wall"],
                difficulty: "beginner"
              },
              {
                name: "Dead Bug",
                category: "core",
                sets: 3,
                reps: "10 each side",
                restBetweenSets: "45 seconds",
                instructions: "Lie on back, extend opposite arm and leg",
                targetMuscles: ["core", "hip flexors"],
                equipment: ["none"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "30 minutes",
            caloriesBurned: 200,
            notes: "Focus on muscle activation and control"
          },
          {
            dayNumber: 7,
            dayName: "Sunday - Rest Day",
            restDay: true,
            exercises: [],
            totalDuration: "0 minutes",
            caloriesBurned: 0,
            notes: "Complete rest day. Focus on meal prep and hydration."
          }
        ]
      }
      // Additional weeks would follow similar pattern with progressive difficulty
    ]
  },
  nutritionPlan: {
    dailyCalories: 1500,
    macros: {
      protein: 120, // grams
      carbs: 150,   // grams
      fats: 50      // grams
    },
    mealPlans: [
      {
        day: 1,
        meals: [
          {
            type: "breakfast",
            name: "Protein-Packed Oatmeal",
            ingredients: [
              "1/2 cup rolled oats",
              "1 scoop vanilla protein powder",
              "1 tbsp almond butter",
              "1/2 banana sliced",
              "1 tsp chia seeds",
              "1 cup unsweetened almond milk"
            ],
            calories: 380,
            protein: 25,
            carbs: 45,
            fats: 12,
            instructions: "Cook oats with almond milk, stir in protein powder when cool, top with remaining ingredients",
            prepTime: "10 minutes"
          },
          {
            type: "lunch",
            name: "Grilled Chicken Salad",
            ingredients: [
              "4 oz grilled chicken breast",
              "2 cups mixed greens",
              "1/2 cucumber diced",
              "1/4 cup cherry tomatoes",
              "1/4 avocado",
              "2 tbsp balsamic vinaigrette",
              "1 tbsp pumpkin seeds"
            ],
            calories: 420,
            protein: 35,
            carbs: 15,
            fats: 18,
            instructions: "Combine all ingredients, toss with dressing",
            prepTime: "15 minutes"
          },
          {
            type: "snack",
            name: "Greek Yogurt with Berries",
            ingredients: [
              "1 cup plain Greek yogurt",
              "1/2 cup mixed berries",
              "1 tbsp honey",
              "1 tbsp chopped almonds"
            ],
            calories: 220,
            protein: 20,
            carbs: 25,
            fats: 6,
            instructions: "Mix yogurt with honey, top with berries and almonds",
            prepTime: "5 minutes"
          },
          {
            type: "dinner",
            name: "Baked Salmon with Vegetables",
            ingredients: [
              "5 oz salmon fillet",
              "1 cup roasted broccoli",
              "1/2 cup quinoa cooked",
              "1 tsp olive oil",
              "Lemon and herbs for seasoning"
            ],
            calories: 480,
            protein: 40,
            carbs: 35,
            fats: 14,
            instructions: "Bake salmon at 400°F for 15 minutes, serve with quinoa and vegetables",
            prepTime: "25 minutes"
          }
        ]
      }
    ],
    supplements: [
      {
        name: "Multivitamin",
        dosage: "1 tablet",
        timing: "With breakfast",
        purpose: "Fill nutritional gaps"
      },
      {
        name: "Omega-3 Fish Oil",
        dosage: "1000mg",
        timing: "With dinner",
        purpose: "Support heart health and recovery"
      }
    ],
    hydrationGoal: 3, // liters per day
    nutritionTips: [
      "Eat protein with every meal to maintain muscle mass",
      "Fill half your plate with vegetables",
      "Choose complex carbohydrates over simple sugars",
      "Don't skip meals - eat every 3-4 hours",
      "Prepare meals in advance to avoid poor food choices"
    ]
  },
  progressTracking: {
    metrics: [
      {
        name: "Weight",
        unit: "pounds",
        targetValue: -8,
        frequency: "weekly"
      },
      {
        name: "Body Fat Percentage",
        unit: "percentage",
        targetValue: -5,
        frequency: "bi-weekly"
      },
      {
        name: "Waist Circumference",
        unit: "inches",
        targetValue: -2,
        frequency: "weekly"
      },
      {
        name: "Workout Completion",
        unit: "percentage",
        targetValue: 90,
        frequency: "weekly"
      }
    ],
    milestones: [
      {
        week: 2,
        title: "First 2 Weeks Complete",
        description: "Congratulations on building the habit!",
        reward: "New workout playlist"
      },
      {
        week: 4,
        title: "Halfway Point",
        description: "You're halfway to your goal!",
        reward: "Progress photo comparison"
      },
      {
        week: 6,
        title: "6 Weeks Strong",
        description: "Your dedication is showing results!",
        reward: "New workout gear"
      },
      {
        week: 8,
        title: "Challenge Complete",
        description: "You did it! 8 weeks of consistent effort!",
        reward: "Certificate of completion + fitness assessment"
      }
    ]
  },
  expertTips: [
    {
      category: "workout",
      tip: "Focus on progressive overload - gradually increase intensity each week",
      author: "Sarah Johnson, Certified Personal Trainer"
    },
    {
      category: "nutrition",
      tip: "Meal prep on Sundays to set yourself up for success all week",
      author: "Dr. Michael Chen, Sports Nutritionist"
    },
    {
      category: "recovery",
      tip: "Sleep is when your body repairs and builds muscle - aim for 7-8 hours nightly",
      author: "Lisa Rodriguez, Recovery Specialist"
    },
    {
      category: "mindset",
      tip: "Focus on how you feel rather than just the number on the scale",
      author: "David Kim, Wellness Coach"
    }
  ]
};

// Muscle Gain Challenge - 12 Week Bulk
const muscleGainChallenge = {
  title: "12-Week Muscle Building Challenge",
  description: "A comprehensive muscle-building program focused on progressive strength training, proper nutrition, and recovery. Designed for intermediate to advanced fitness levels.",
  category: "muscle-gain",
  difficulty: "advanced",
  type: "custom",
  duration: { value: 12, unit: "weeks" },
  maxParticipants: 50,
  tags: ["muscle-gain", "strength", "bodybuilding", "nutrition", "advanced"],
  goals: [
    {
      title: "Muscle Mass Gain",
      description: "Gain 8-15 pounds of lean muscle mass",
      target: { value: 12, unit: "pounds" }
    },
    {
      title: "Strength Increase",
      description: "Increase major lift numbers by 20-30%",
      target: { value: 25, unit: "percentage" }
    },
    {
      title: "Body Composition",
      description: "Improve muscle to fat ratio",
      target: { value: 5, unit: "percentage muscle increase" }
    }
  ],
  rules: [
    "Train 5-6 days per week following the program",
    "Eat in a caloric surplus (300-500 calories above maintenance)",
    "Get 7-9 hours of sleep each night",
    "Track all workouts and progressive overload",
    "Take progress photos and measurements weekly"
  ],
  workoutPlan: {
    weeks: [
      {
        weekNumber: 1,
        days: [
          {
            dayNumber: 1,
            dayName: "Monday - Chest & Triceps",
            restDay: false,
            exercises: [
              {
                name: "Barbell Bench Press",
                category: "strength",
                sets: 4,
                reps: "8-10",
                restBetweenSets: "3 minutes",
                instructions: "Control the descent, pause briefly on chest, drive up explosively",
                targetMuscles: ["chest", "triceps", "shoulders"],
                equipment: ["barbell", "bench"],
                difficulty: "advanced"
              },
              {
                name: "Incline Dumbbell Press",
                category: "strength",
                sets: 4,
                reps: "10-12",
                restBetweenSets: "2.5 minutes",
                instructions: "45-degree incline, full range of motion",
                targetMuscles: ["upper chest", "shoulders", "triceps"],
                equipment: ["dumbbells", "incline bench"],
                difficulty: "intermediate"
              },
              {
                name: "Dips",
                category: "strength",
                sets: 3,
                reps: "12-15",
                restBetweenSets: "2 minutes",
                instructions: "Lean forward slightly for chest emphasis",
                targetMuscles: ["chest", "triceps", "shoulders"],
                equipment: ["dip bars"],
                difficulty: "intermediate"
              },
              {
                name: "Close-Grip Bench Press",
                category: "strength",
                sets: 4,
                reps: "10-12",
                restBetweenSets: "2.5 minutes",
                instructions: "Hands shoulder-width apart, elbows close to body",
                targetMuscles: ["triceps", "chest"],
                equipment: ["barbell", "bench"],
                difficulty: "intermediate"
              },
              {
                name: "Overhead Tricep Extension",
                category: "strength",
                sets: 3,
                reps: "12-15",
                restBetweenSets: "90 seconds",
                instructions: "Keep elbows stationary, full stretch at bottom",
                targetMuscles: ["triceps"],
                equipment: ["dumbbell"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "75 minutes",
            caloriesBurned: 350,
            notes: "Focus on progressive overload. Increase weight when you can complete all sets with good form."
          },
          {
            dayNumber: 2,
            dayName: "Tuesday - Back & Biceps",
            restDay: false,
            exercises: [
              {
                name: "Deadlifts",
                category: "strength",
                sets: 4,
                reps: "6-8",
                restBetweenSets: "3-4 minutes",
                instructions: "Keep bar close to body, drive through heels, squeeze glutes at top",
                targetMuscles: ["back", "glutes", "hamstrings", "traps"],
                equipment: ["barbell"],
                difficulty: "advanced"
              },
              {
                name: "Pull-ups/Lat Pulldowns",
                category: "strength",
                sets: 4,
                reps: "8-12",
                restBetweenSets: "2.5 minutes",
                instructions: "Full range of motion, squeeze shoulder blades together",
                targetMuscles: ["lats", "rhomboids", "biceps"],
                equipment: ["pull-up bar", "cable machine"],
                difficulty: "intermediate"
              },
              {
                name: "Barbell Rows",
                category: "strength",
                sets: 4,
                reps: "10-12",
                restBetweenSets: "2.5 minutes",
                instructions: "Hinge at hips, pull to lower chest/upper abdomen",
                targetMuscles: ["lats", "rhomboids", "middle traps"],
                equipment: ["barbell"],
                difficulty: "intermediate"
              },
              {
                name: "Barbell Curls",
                category: "strength",
                sets: 4,
                reps: "10-12",
                restBetweenSets: "2 minutes",
                instructions: "Control the weight, squeeze at the top",
                targetMuscles: ["biceps"],
                equipment: ["barbell"],
                difficulty: "beginner"
              },
              {
                name: "Hammer Curls",
                category: "strength",
                sets: 3,
                reps: "12-15",
                restBetweenSets: "90 seconds",
                instructions: "Neutral grip, control both up and down phases",
                targetMuscles: ["biceps", "brachialis"],
                equipment: ["dumbbells"],
                difficulty: "beginner"
              }
            ],
            totalDuration: "80 minutes",
            caloriesBurned: 380,
            notes: "Deadlifts are the king of exercises. Focus on perfect form before adding weight."
          }
        ]
      }
    ]
  },
  nutritionPlan: {
    dailyCalories: 3200,
    macros: {
      protein: 200, // grams
      carbs: 400,   // grams  
      fats: 100     // grams
    },
    mealPlans: [
      {
        day: 1,
        meals: [
          {
            type: "breakfast",
            name: "Muscle-Building Breakfast",
            ingredients: [
              "3 whole eggs + 2 egg whites",
              "1 cup oatmeal",
              "1 banana",
              "2 tbsp peanut butter",
              "1 cup whole milk"
            ],
            calories: 850,
            protein: 35,
            carbs: 75,
            fats: 28,
            instructions: "Scramble eggs, prepare oatmeal with milk, top with banana and peanut butter",
            prepTime: "15 minutes"
          },
          {
            type: "lunch",
            name: "Power Lunch Bowl",
            ingredients: [
              "8 oz grilled chicken breast",
              "1.5 cups jasmine rice",
              "1 cup steamed vegetables",
              "1/4 avocado",
              "2 tbsp olive oil"
            ],
            calories: 920,
            protein: 55,
            carbs: 85,
            fats: 22,
            instructions: "Grill chicken, serve over rice with vegetables and avocado",
            prepTime: "20 minutes"
          },
          {
            type: "snack",
            name: "Post-Workout Shake",
            ingredients: [
              "2 scoops whey protein",
              "1 large banana",
              "1 cup whole milk",
              "2 tbsp oats",
              "1 tbsp honey"
            ],
            calories: 580,
            protein: 50,
            carbs: 65,
            fats: 8,
            instructions: "Blend all ingredients until smooth",
            prepTime: "5 minutes"
          },
          {
            type: "dinner",
            name: "Anabolic Dinner",
            ingredients: [
              "8 oz lean beef",
              "2 medium sweet potatoes",
              "Large mixed salad",
              "2 tbsp olive oil dressing"
            ],
            calories: 850,
            protein: 60,
            carbs: 70,
            fats: 25,
            instructions: "Grill beef, roast sweet potatoes, serve with salad",
            prepTime: "30 minutes"
          }
        ]
      }
    ],
    supplements: [
      {
        name: "Whey Protein Powder",
        dosage: "25-50g",
        timing: "Post-workout and between meals",
        purpose: "Muscle protein synthesis"
      },
      {
        name: "Creatine Monohydrate",
        dosage: "5g",
        timing: "Daily, any time",
        purpose: "Increased strength and power"
      },
      {
        name: "Multivitamin",
        dosage: "1 tablet",
        timing: "With breakfast",
        purpose: "Micronutrient support"
      }
    ],
    hydrationGoal: 4, // liters per day
    nutritionTips: [
      "Eat in a caloric surplus of 300-500 calories above maintenance",
      "Consume 1.6-2.2g protein per kg of body weight",
      "Time carbohydrates around workouts for energy and recovery",
      "Don't fear healthy fats - they support hormone production",
      "Eat frequently - 5-6 meals per day to support muscle growth"
    ]
  },
  progressTracking: {
    metrics: [
      {
        name: "Body Weight",
        unit: "pounds",
        targetValue: 12,
        frequency: "weekly"
      },
      {
        name: "Bench Press 1RM",
        unit: "pounds",
        frequency: "bi-weekly"
      },
      {
        name: "Squat 1RM", 
        unit: "pounds",
        frequency: "bi-weekly"
      },
      {
        name: "Deadlift 1RM",
        unit: "pounds", 
        frequency: "bi-weekly"
      },
      {
        name: "Arm Circumference",
        unit: "inches",
        frequency: "weekly"
      }
    ],
    milestones: [
      {
        week: 3,
        title: "Foundation Built",
        description: "You've established the routine and form",
        reward: "Workout log book"
      },
      {
        week: 6,
        title: "Halfway Warrior",
        description: "Strength gains should be noticeable",
        reward: "Progress assessment and plan adjustment"
      },
      {
        week: 9,
        title: "Strength Surge",
        description: "Major strength improvements achieved",
        reward: "New lifting belt or straps"
      },
      {
        week: 12,
        title: "Muscle Building Master",
        description: "12 weeks of dedicated muscle building complete!",
        reward: "Body composition analysis + advanced program"
      }
    ]
  },
  expertTips: [
    {
      category: "workout",
      tip: "Progressive overload is key - aim to add weight, reps, or sets each week",
      author: "Marcus Thompson, Strength Coach"
    },
    {
      category: "nutrition", 
      tip: "Eat carbs around your workouts to fuel performance and recovery",
      author: "Dr. Amanda Foster, Sports Nutritionist"
    },
    {
      category: "recovery",
      tip: "Muscle growth happens during rest - don't underestimate sleep and rest days",
      author: "Jake Williams, Recovery Specialist"
    },
    {
      category: "mindset",
      tip: "Be patient - muscle building is a slow process that requires consistency",
      author: "Rachel Green, Mindset Coach"
    }
  ]
};

module.exports = {
  weightLossChallenge,
  muscleGainChallenge
};
