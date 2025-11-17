import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import {
    Target,
    Users,
    Calendar,
    Trophy,
    Star,
    Filter,
    Search,
    TrendingUp,
    Zap,
    Heart,
    Clock,
    Award,
    Flame,
    Mountain,
    Dumbbell,
    Activity,
    Flower,
    Play,
    X,
    ArrowRight,
    CheckCircle,
    BarChart2,
    FileText,
    BookOpen,
    MessageSquare,
    Award as AwardIcon,
    Calendar as CalendarIcon,
    Clock as ClockIcon,
    Users as UsersIcon,
    TrendingUp as TrendingUpIcon,
    CheckCircle as CheckCircleIcon
} from 'lucide-react';

// Different content type components
const ChallengeContent = ({ challenge }) => {
    switch(challenge.contentType) {
        case 'video':
            return (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <YouTube
                        videoId={challenge.videoId}
                        opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 0,
                                modestbranding: 1,
                                rel: 0,
                            },
                        }}
                        className="w-full h-full"
                    />
                </div>
            );
        case 'article':
            return (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center space-x-3 h-full">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                        <h4 className="font-medium">Read Article</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complete this reading to learn more</p>
                    </div>
                </div>
            );
        case 'nutrition-article':
            return (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center space-x-3 h-full">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                        <h4 className="font-medium">Nutrition Article</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Learn about essential nutrients</p>
                    </div>
                </div>
            );
        case 'quiz':
            return (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center space-x-3 h-full">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <div>
                        <h4 className="font-medium">Take Quiz</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Test your knowledge</p>
                    </div>
                </div>
            );
        case 'discussion':
            return (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center space-x-3 h-full">
                    <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                        <h4 className="font-medium">Join Discussion</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Share your thoughts</p>
                    </div>
                </div>
            );
        default:
            return (
                <img 
                    src={challenge.image} 
                    alt={challenge.title}
                    className="w-full h-48 object-cover"
                />
            );
    }
};

const NutritionArticle = ({ articleId }) => {
    // Sample nutrition articles data
    const articles = {
        'protein-basics': {
            id: 'protein-basics',
            title: 'The Complete Guide to Protein',
            author: 'Dr. Sarah Johnson',
            date: 'October 5, 2024',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
            content: [
                {
                    type: 'heading',
                    text: 'What is Protein?'
                },
                {
                    type: 'paragraph',
                    text: 'Proteins are large, complex molecules that play many critical roles in the body. They do most of the work in cells and are required for the structure, function, and regulation of the body\'s tissues and organs.'
                },
                {
                    type: 'heading',
                    text: 'Why is Protein Important?'
                },
                {
                    type: 'paragraph',
                    text: 'Protein is essential for building and repairing tissues, making enzymes and hormones, and is an important building block of bones, muscles, cartilage, skin, and blood.'
                },
                {
                    type: 'list',
                    items: [
                        'Helps build and repair muscles',
                        'Supports immune function',
                        'Aids in weight management',
                        'Essential for healthy hair and nails',
                        'Helps maintain proper pH balance'
                    ]
                },
                {
                    type: 'heading',
                    text: 'Best Protein Sources'
                },
                {
                    type: 'paragraph',
                    text: 'High-quality protein sources include:'
                },
                {
                    type: 'list',
                    items: [
                        'Lean meats (chicken, turkey, lean beef)',
                        'Fish and seafood',
                        'Eggs',
                        'Dairy products (milk, cheese, yogurt)',
                        'Legumes (beans, lentils, chickpeas)',
                        'Nuts and seeds',
                        'Soy products (tofu, tempeh, edamame)'
                    ]
                },
                {
                    type: 'heading',
                    text: 'How Much Protein Do You Need?'
                },
                {
                    type: 'paragraph',
                    text: 'The Recommended Dietary Allowance (RDA) for protein is 0.8 grams of protein per kilogram of body weight. However, this can vary based on age, sex, and activity level.'
                }
            ]
        },
        'healthy-fats': {
            id: 'healthy-fats',
            title: 'Understanding Healthy Fats',
            author: 'Nutritionist Mark Davis',
            date: 'October 3, 2024',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800',
            content: [
                {
                    type: 'heading',
                    text: 'The Truth About Fats'
                },
                {
                    type: 'paragraph',
                    text: 'Not all fats are created equal. While trans fats and some saturated fats can be harmful, healthy fats are crucial for your body and brain.'
                },
                {
                    type: 'heading',
                    text: 'Types of Healthy Fats'
                },
                {
                    type: 'subheading',
                    text: 'Monounsaturated Fats'
                },
                {
                    type: 'paragraph',
                    text: 'Found in olive oil, avocados, and nuts, these fats help reduce bad cholesterol levels and provide nutrients to help develop and maintain your body\'s cells.'
                },
                {
                    type: 'subheading',
                    text: 'Polyunsaturated Fats'
                },
                {
                    type: 'paragraph',
                    text: 'Includes omega-3 and omega-6 fatty acids, found in fatty fish, walnuts, and flaxseeds. These are essential fats that your body needs for brain function and cell growth.'
                }
            ]
        },
        'carbohydrates-101': {
            id: 'carbohydrates-101',
            title: 'Carbohydrates: Friend or Foe?',
            author: 'Dr. Emily Chen',
            date: 'September 28, 2024',
            readTime: '7 min read',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
            content: [
                {
                    type: 'heading',
                    text: 'Understanding Carbohydrates'
                },
                {
                    type: 'paragraph',
                    text: 'Carbohydrates are the body\'s main source of energy. They are found in a wide array of both healthy and unhealthy foods.'
                },
                {
                    type: 'heading',
                    text: 'Types of Carbohydrates'
                },
                {
                    type: 'list',
                    items: [
                        'Simple carbs (sugars) - Found in fruits, milk, and processed foods',
                        'Complex carbs (starches) - Found in whole grains, vegetables, and legumes',
                        'Fiber - Found in fruits, vegetables, and whole grains'
                    ]
                }
            ]
        },
        'vitamins-minerals': {
            id: 'vitamins-minerals',
            title: 'Essential Vitamins and Minerals',
            author: 'Dr. Lisa Wong',
            date: 'September 25, 2024',
            readTime: '10 min read',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
            content: [
                {
                    type: 'heading',
                    text: 'Micronutrients for Optimal Health'
                },
                {
                    type: 'paragraph',
                    text: 'Vitamins and minerals are essential nutrients that your body needs in small amounts to work properly.'
                },
                {
                    type: 'heading',
                    text: 'Key Vitamins and Their Functions'
                },
                {
                    type: 'table',
                    headers: ['Vitamin', 'Function', 'Food Sources'],
                    rows: [
                        ['Vitamin A', 'Vision, immune function', 'Carrots, sweet potatoes, spinach'],
                        ['Vitamin C', 'Immune function, skin health', 'Citrus fruits, bell peppers, strawberries'],
                        ['Vitamin D', 'Bone health, immune function', 'Fatty fish, egg yolks, fortified foods'],
                        ['Vitamin E', 'Antioxidant, skin health', 'Nuts, seeds, vegetable oils'],
                        ['Vitamin K', 'Blood clotting, bone health', 'Leafy greens, broccoli, Brussels sprouts']
                    ]
                }
            ]
        },
        'hydration-essentials': {
            id: 'hydration-essentials',
            title: 'The Importance of Hydration',
            author: 'Dr. Michael Brown',
            date: 'September 20, 2024',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1551029506-0815fecfe2e8?w=800',
            content: [
                {
                    type: 'heading',
                    text: 'Why Hydration Matters'
                },
                {
                    type: 'paragraph',
                    text: 'Water makes up about 60% of your body weight and is essential for nearly every bodily function.'
                },
                {
                    type: 'list',
                    items: [
                        'Regulates body temperature',
                        'Lubricates joints',
                        'Helps transport nutrients',
                        'Aids digestion',
                        'Flushes out waste products'
                    ]
                },
                {
                    type: 'heading',
                    text: 'How Much Water Do You Need?'
                },
                {
                    type: 'paragraph',
                    text: 'The general recommendation is about 3.7 liters (125 ounces) for men and 2.7 liters (91 ounces) for women per day from all beverages and foods.'
                }
            ]
        }
    };

    const article = articles[articleId] || articles['protein-basics'];

    const renderContent = (content) => {
        return content.map((item, index) => {
            switch (item.type) {
                case 'heading':
                    return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-white">{item.text}</h3>;
                case 'subheading':
                    return <h4 key={index} className="text-lg font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300">{item.text}</h4>;
                case 'paragraph':
                    return <p key={index} className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>;
                case 'list':
                    return (
                        <ul key={index} className="list-disc pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
                            {item.items.map((listItem, i) => (
                                <li key={i} className="leading-relaxed">{listItem}</li>
                            ))}
                        </ul>
                    );
                case 'table':
                    return (
                        <div key={index} className="overflow-x-auto my-4">
                            <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-blue-50 dark:bg-blue-900/30">
                                        {item.headers.map((header, i) => (
                                            <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {item.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-700/50'}>
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
                <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{article.title}</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <span>By {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                    {renderContent(article.content)}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Read More Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(articles)
                            .filter(a => a.id !== articleId)
                            .slice(0, 2)
                            .map(relatedArticle => (
                                <div key={relatedArticle.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                    <img 
                                        src={relatedArticle.image} 
                                        alt={relatedArticle.title}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-medium text-gray-800 dark:text-white">{relatedArticle.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{relatedArticle.readTime} • {relatedArticle.author}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Quiz = ({ quizId, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Sample quiz questions
    const quizQuestions = [
        {
            question: "What is the recommended daily water intake for an average adult?",
            options: [
                "1 liter",
                "2 liters (8 glasses)",
                "3 liters",
                "4 liters"
            ],
            correctAnswer: 1
        },
        {
            question: "Which of these is NOT a component of fitness?",
            options: [
                "Cardiovascular endurance",
                "Muscular strength",
                "Flexibility",
                "Hair color"
            ],
            correctAnswer: 3
        },
        {
            question: "How many days of rest per week are generally recommended for muscle recovery?",
            options: [
                "0 days",
                "1-2 days",
                "3-4 days",
                "5-6 days"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the recommended amount of sleep for adults per night?",
            options: [
                "4-5 hours",
                "5-6 hours",
                "7-9 hours",
                "10+ hours"
            ],
            correctAnswer: 2
        },
        {
            question: "Which of these is a compound exercise?",
            options: [
                "Bicep curl",
                "Leg extension",
                "Squat",
                "Tricep pushdown"
            ],
            correctAnswer: 2
        },
        {
            question: "What is the best time to stretch?",
            options: [
                "Before workout only",
                "After workout only",
                "Before and after workout",
                "It doesn't matter"
            ],
            correctAnswer: 2
        },
        {
            question: "Which nutrient is the body's main source of energy?",
            options: [
                "Protein",
                "Fats",
                "Carbohydrates",
                "Vitamins"
            ],
            correctAnswer: 2
        },
        {
            question: "How often should you change your workout routine?",
            options: [
                "Every week",
                "Every 4-6 weeks",
                "Every 6 months",
                "Never"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the recommended daily step count for general health?",
            options: [
                "2,000 steps",
                "5,000 steps",
                "8,000 steps",
                "10,000 steps"
            ],
            correctAnswer: 3
        },
        {
            question: "Which of these is NOT a benefit of regular exercise?",
            options: [
                "Improved mood",
                "Better sleep",
                "Weaker immune system",
                "Increased energy"
            ],
            correctAnswer: 2
        }
    ];

    const handleAnswer = (selectedIndex) => {
        if (isAnswered) return;
        
        setSelectedOption(selectedIndex);
        setIsAnswered(true);
        
        if (selectedIndex === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        
        // Move to next question after a short delay
        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setShowResult(true);
                onComplete(score + (selectedIndex === quizQuestions[currentQuestion].correctAnswer ? 1 : 0));
            }
        }, 1000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    if (showResult) {
        return (
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                    {score}/10
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {score >= 8 ? 'Excellent! You know your fitness well!' : 
                     score >= 5 ? 'Good job! Keep learning!' : 
                     'Keep trying! You can do better next time!'}
                </p>
                <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const currentQ = quizQuestions[currentQuestion];

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Score: {score}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                {currentQ.question}
            </h3>

            <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                    let buttonClass = "w-full text-left p-4 rounded-lg border transition-colors ";
                    
                    if (isAnswered) {
                        if (index === currentQ.correctAnswer) {
                            buttonClass += "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200";
                        } else if (index === selectedOption && index !== currentQ.correctAnswer) {
                            buttonClass += "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200";
                        } else {
                            buttonClass += "border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700";
                        }
                    } else {
                        buttonClass += "border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700";
                    }

                    return (
                        <button
                            key={index}
                            className={buttonClass}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        {selectedOption === currentQ.correctAnswer 
                            ? '✅ Correct! Well done!'
                            : `❌ Incorrect. The correct answer is: ${currentQ.options[currentQ.correctAnswer]}`}
                    </p>
                </div>
            )}
        </div>
    );
};

const ChallengesPage = () => {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [showContentModal, setShowContentModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    // Categories with icons
    const categories = [
        { id: 'all', name: 'All Challenges', icon: <Flame className="w-4 h-4" /> },
        { id: 'strength', name: 'Strength', icon: <Dumbbell className="w-4 h-4" /> },
        { id: 'weight-loss', name: 'Weight Loss', icon: <Activity className="w-4 h-4" /> },
        { id: 'yoga', name: 'Yoga', icon: <Flower className="w-4 h-4" /> },
        { id: 'endurance', name: 'Endurance', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'nutrition', name: 'Nutrition', icon: <Heart className="w-4 h-4" /> },
    ];

    // Difficulty levels
    const difficulties = [
        { id: 'all', name: 'All Levels' },
        { id: 'beginner', name: 'Beginner' },
        { id: 'intermediate', name: 'Intermediate' },
        { id: 'advanced', name: 'Advanced' },
    ];

    // Content types
    const contentTypes = [
        { id: 'all', name: 'All Types' },
        { id: 'video', name: 'Video' },
        { id: 'article', name: 'Article' },
        { id: 'quiz', name: 'Quiz' },
        { id: 'discussion', name: 'Discussion' },
        { id: 'nutrition-article', name: 'Nutrition Article' },
    ];

    // Sample challenges data with different content types
    const sampleChallenges = [
        // Video Challenge - Yoga
        {
            id: 1,
            title: "30-Day Yoga Challenge",
            description: "Transform your body and mind with daily yoga sessions designed for all levels.",
            category: "yoga",
            difficulty: "beginner",
            duration: "30 days",
            participants: 12500,
            maxParticipants: 20000,
            startDate: "2024-01-01",
            endDate: "2024-01-30",
            rewards: ["Yoga Master Badge", "Exclusive Meditation Guide"],
            tags: ["Yoga", "Mindfulness", "Flexibility"],
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
            contentType: "video",
            videoId: "Eml2xnoLpYE",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "YogaWithAdriene",
            rating: 4.8,
            reviews: 1243
        },
        // Video Challenge - HIIT
        {
            id: 5,
            title: "14-Day HIIT Challenge",
            description: "High-Intensity Interval Training to boost your metabolism and burn fat.",
            category: "hiit",
            difficulty: "advanced",
            duration: "14 days",
            participants: 18700,
            maxParticipants: 25000,
            startDate: "2024-01-05",
            endDate: "2024-01-19",
            rewards: ["HIIT Warrior Badge", "Workout Plan"],
            tags: ["HIIT", "Cardio", "Fat Burn"],
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
            contentType: "video",
            videoId: "ml6cTNHAZAY",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "TransformCo",
            rating: 4.9,
            reviews: 567
        },
        // Video Challenge - Strength Training
        {
            id: 6,
            title: "30-Day Strength Training",
            description: "Build muscle and increase strength with this comprehensive training program.",
            category: "strength",
            difficulty: "intermediate",
            duration: "30 days",
            participants: 21500,
            maxParticipants: 30000,
            startDate: "2024-01-10",
            endDate: "2024-02-10",
            rewards: ["Strength Badge", "Workout Plan"],
            tags: ["Strength", "Muscle Building", "Weight Training"],
            image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800",
            contentType: "video",
            videoId: "eGo4IYlbE5g",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "FitPro",
            rating: 4.8,
            reviews: 892
        },
        // Video Challenge - Cardio Dance
        {
            id: 7,
            title: "21-Day Dance Cardio",
            description: "Fun and energetic dance workouts to get your heart pumping and burn calories.",
            category: "cardio",
            difficulty: "beginner",
            duration: "21 days",
            participants: 15400,
            maxParticipants: 25000,
            startDate: "2024-01-15",
            endDate: "2024-02-05",
            rewards: ["Dance Star Badge", "Playlist"],
            tags: ["Dance", "Cardio", "Fun"],
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
            contentType: "video",
            videoId: "t7jTnBzZ2Rk",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "DanceFit",
            rating: 4.7,
            reviews: 723
        },
        // Article Challenge
        {
            id: 2,
            title: "Nutrition Guide for Athletes",
            description: "Learn how to fuel your body for optimal performance and recovery.",
            category: "nutrition",
            difficulty: "intermediate",
            duration: "14 days",
            participants: 8430,
            maxParticipants: 10000,
            startDate: "2024-01-10",
            endDate: "2024-01-24",
            rewards: ["Meal Planning Guide", "Nutrition Badge"],
            tags: ["Nutrition", "Meal Planning", "Recovery"],
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
            contentType: "article",
            articleId: "nutrition-guide-athletes",
            isActive: true,
            isJoined: true,
            progress: 30,
            creator: "FitLife",
            rating: 4.6,
            reviews: 876
        },
        // Quiz Challenge
        {
            id: 3,
            title: "Fitness Knowledge Test",
            description: "Test your knowledge about fitness, nutrition, and healthy living.",
            category: "education",
            difficulty: "intermediate",
            duration: "1 day",
            participants: 21500,
            maxParticipants: 50000,
            startDate: "2024-01-05",
            endDate: "2024-12-31",
            rewards: ["Knowledge Badge", "10% off personal training"],
            tags: ["Quiz", "Education", "Facts"],
            image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800",
            contentType: "quiz",
            quizId: "fitness-knowledge-2024",
            isActive: true,
            isJoined: true,
            progress: 100,
            creator: "FitMind",
            rating: 4.7,
            reviews: 1543
        },
        // Discussion Challenge
        {
            id: 4,
            title: "Mindfulness & Meditation",
            description: "Join our community discussion on mindfulness practices and mental wellbeing.",
            category: "mindfulness",
            difficulty: "beginner",
            duration: "7 days",
            participants: 9800,
            maxParticipants: 15000,
            startDate: "2024-01-15",
            endDate: "2024-01-22",
            rewards: ["Meditation Guide", "Community Badge"],
            tags: ["Mindfulness", "Meditation", "Mental Health"],
            image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800",
            contentType: "discussion",
            discussionId: "mindfulness-2024",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "MindfulLiving",
            rating: 4.9,
            reviews: 2301
        },
        // Video Challenge - Pilates
        {
            id: 8,
            title: "Pilates for Core Strength",
            description: "Develop core strength, flexibility, and posture with these pilates workouts.",
            category: "pilates",
            difficulty: "intermediate",
            duration: "28 days",
            participants: 11200,
            maxParticipants: 20000,
            startDate: "2024-01-20",
            endDate: "2024-02-17",
            rewards: ["Core Master Badge", "Pilates Guide"],
            tags: ["Pilates", "Core", "Flexibility"],
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
            contentType: "video",
            videoId: "aUfPCITWfZ4",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "PilatesPro",
            rating: 4.8,
            reviews: 654
        },
        // Nutrition Article Challenge
        {
            id: 6,
            title: "Nutrition Fundamentals",
            description: "Learn the basics of nutrition and how to make healthier food choices.",
            category: "nutrition",
            difficulty: "beginner",
            duration: "7 days",
            participants: 2150,
            maxParticipants: 5000,
            startDate: "2024-01-15",
            endDate: "2024-01-22",
            rewards: ["Nutrition Badge", "Meal Plan"],
            tags: ["Nutrition", "Healthy Eating", "Meal Planning"],
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
            contentType: "nutrition-article",
            articleId: "protein-basics",
            isActive: true,
            isJoined: false,
            progress: 0,
            creator: "HealthExperts",
            rating: 4.7,
            reviews: 245
        }
    ];

    // Initialize challenges
    useEffect(() => {
        setChallenges(sampleChallenges);
        setFilteredChallenges(sampleChallenges);
    }, []);

    // Filter and sort challenges
    useEffect(() => {
        let result = [...challenges];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(challenge =>
                challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(challenge => challenge.category === selectedCategory);
        }

        // Filter by difficulty
        if (selectedDifficulty !== 'all') {
            result = result.filter(challenge => challenge.difficulty === selectedDifficulty);
        }

        // Sort challenges
        result.sort((a, b) => {
            switch (sortBy) {
                case 'popularity':
                    return b.participants - a.participants;
                case 'newest':
                    return new Date(b.startDate) - new Date(a.startDate);
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        setFilteredChallenges(result);
    }, [searchTerm, selectedCategory, selectedDifficulty, sortBy, challenges]);

    // Get category icon
    const getCategoryIcon = (category) => {
        const icon = categories.find(cat => cat.id === category)?.icon;
        return icon || <Flame className="w-5 h-5" />;
    };

    // Handle challenge join
    const handleJoinChallenge = (challengeId) => {
        setChallenges(challenges.map(challenge => 
            challenge.id === challengeId 
                ? { ...challenge, isJoined: true, progress: 5 } 
                : challenge
        ));
        console.log('Successfully joined the challenge!');
    };

    // Handle content click
    const handleContentClick = (challenge) => {
        setSelectedContent(challenge);
        setShowContentModal(true);
    };

    // Render challenge card
    const renderChallengeCard = (challenge) => (
        <motion.div 
            key={challenge.id}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
        >
            {/* Challenge Content Preview */}
            <div 
                className="relative cursor-pointer"
                onClick={() => handleContentClick(challenge)}
            >
                <div className="w-full h-48 bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    <ChallengeContent challenge={challenge} />
                </div>
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {challenge.duration}
                </div>
                {challenge.contentType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white" fill="white" />
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                        {getCategoryIcon(challenge.category)}
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {challenge.creator}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{challenge.rating}</span>
                        <span className="text-xs text-gray-500">({challenge.reviews})</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {challenge.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {challenge.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.tags.slice(0, 3).map((tag, index) => (
                        <span 
                            key={index}
                            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {challenge.participants.toLocaleString()}
                        </span>
                    </div>
                    
                    <button
                        onClick={() => handleJoinChallenge(challenge.id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            challenge.isJoined 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={challenge.isJoined}
                    >
                        {challenge.isJoined ? 'Joined' : 'Join Challenge'}
                    </button>
                </div>

                {challenge.isJoined && (
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${challenge.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );

    // Render content modal
    const renderContentModal = () => {
        if (!selectedContent) return null;

        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {selectedContent.title}
                            </h2>
                            <button 
                                onClick={() => setShowContentModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-6">
                            {selectedContent.contentType === 'nutrition-article' ? (
                                <NutritionArticle articleId={selectedContent.articleId} />
                            ) : selectedContent.contentType === 'video' ? (
                                <div className="aspect-w-16 aspect-h-9">
                                    <YouTube
                                        videoId={selectedContent.videoId}
                                        opts={{
                                            width: '100%',
                                            height: '100%',
                                            playerVars: {
                                                autoplay: 1,
                                                modestbranding: 1,
                                                rel: 0,
                                            },
                                        }}
                                        className="w-full h-full rounded-lg"
                                    />
                                </div>
                            ) : (
                                <ChallengeContent challenge={selectedContent} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fitness Challenges</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Join thousands of people in our fitness challenges and achieve your goals together!
                    </p>
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute right-6 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Categories */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex space-x-2 pb-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters and Sort */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex flex-wrap gap-2">
                        {difficulties.map((difficulty) => (
                            <button
                                key={difficulty.id}
                                onClick={() => setSelectedDifficulty(difficulty.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedDifficulty === difficulty.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {difficulty.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="newest">Newest</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map(renderChallengeCard)}
                </div>

                {filteredChallenges.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No challenges found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>

            {/* Content Modal */}
            <AnimatePresence>
                {showContentModal && selectedContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContentModal()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChallengesPage;