import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Trophy,
    MessageCircle,
    Calendar,
    Heart,
    Star,
    TrendingUp,
    Target,
    Award,
    Flame,
    MapPin,
    Clock,
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    Share2,
    Bookmark,
    Flag,
    Crown,
    Medal,
    Zap,
    Activity,
    Dumbbell,
    Heart as HeartIcon,
    MessageSquare,
    ThumbsUp,
    Eye,
    Share
} from 'lucide-react';

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

    // Sample community data
    const communityStats = {
        totalMembers: 15420,
        activeToday: 2847,
        challengesCompleted: 45678,
        totalWorkouts: 123456,
        averageRating: 4.7,
        topContributors: 156
    };

    const topMembers = [{
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            level: "Elite",
            points: 2847,
            achievements: 23,
            streak: 45,
            specialty: "Strength Training",
            followers: 1247,
            isOnline: true
        },
        {
            id: 2,
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            level: "Master",
            points: 2156,
            achievements: 19,
            streak: 32,
            specialty: "Marathon Running",
            followers: 892,
            isOnline: true
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            level: "Elite",
            points: 1987,
            achievements: 21,
            streak: 28,
            specialty: "Yoga & Flexibility",
            followers: 1567,
            isOnline: false
        },
        {
            id: 4,
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            level: "Expert",
            points: 1756,
            achievements: 17,
            streak: 41,
            specialty: "CrossFit",
            followers: 734,
            isOnline: true
        },
        {
            id: 5,
            name: "Lisa Thompson",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
            level: "Master",
            points: 1623,
            achievements: 15,
            streak: 23,
            specialty: "HIIT Training",
            followers: 623,
            isOnline: false
        }
    ];

    const recentPosts = [{
            id: 1,
            author: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            title: "My 30-Day Push-up Challenge Journey",
            content: "Just completed the 30-day push-up challenge! Started with 5 push-ups and ended with 50. The progress was incredible and I feel so much stronger. Anyone else tried this challenge?",
            category: "challenge",
            likes: 89,
            comments: 23,
            shares: 12,
            views: 456,
            timestamp: "2 hours ago",
            tags: ["Push-ups", "Strength", "Challenge"]
        },
        {
            id: 2,
            author: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            title: "Marathon Training Tips for Beginners",
            content: "Training for my first marathon and wanted to share some tips that helped me. Consistency is key, start slow, and don't forget to cross-train. What's your marathon experience?",
            category: "advice",
            likes: 156,
            comments: 45,
            shares: 28,
            views: 892,
            timestamp: "5 hours ago",
            tags: ["Marathon", "Running", "Training"]
        },
        {
            id: 3,
            author: "Emma Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            title: "Yoga Flow for Stress Relief",
            content: "Created a gentle 20-minute yoga flow that helps me unwind after stressful days. Perfect for beginners and great for flexibility. Would love to hear your favorite poses!",
            category: "workout",
            likes: 234,
            comments: 67,
            shares: 89,
            views: 1247,
            timestamp: "1 day ago",
            tags: ["Yoga", "Stress Relief", "Flexibility"]
        }
    ];

    const upcomingEvents = [{
            id: 1,
            title: "Community Workout Meetup",
            description: "Join us for a group HIIT session followed by healthy snacks and networking",
            date: "2024-02-15",
            time: "10:00 AM",
            location: "Central Park Fitness Center",
            attendees: 45,
            maxAttendees: 60,
            category: "meetup"
        },
        {
            id: 2,
            title: "Nutrition Workshop",
            description: "Learn about meal planning, macros, and sustainable eating habits",
            date: "2024-02-18",
            time: "2:00 PM",
            location: "Virtual Event",
            attendees: 89,
            maxAttendees: 100,
            category: "workshop"
        },
        {
            id: 3,
            title: "Running Club Group Run",
            description: "5K group run for all levels, followed by coffee and conversation",
            date: "2024-02-20",
            time: "7:00 AM",
            location: "Riverside Trail",
            attendees: 23,
            maxAttendees: 40,
            category: "group-run"
        }
    ];

    const achievements = [
        { id: 1, name: "First Steps", description: "Complete your first workout", icon: "🎯", unlocked: true },
        { id: 2, name: "Week Warrior", description: "Work out for 7 days straight", icon: "🔥", unlocked: true },
        { id: 3, name: "Challenge Champion", description: "Complete 5 challenges", icon: "🏆", unlocked: true },
        { id: 4, name: "Social Butterfly", description: "Make 10 friends", icon: "🦋", unlocked: false },
        { id: 5, name: "Mile Master", description: "Run 100 miles", icon: "🏃", unlocked: false },
        { id: 6, name: "Strength Legend", description: "Lift 1000 lbs total", icon: "💪", unlocked: false }
    ];

    const categories = [
        { value: 'all', label: 'All Categories', icon: < Target className = "w-4 h-4" / > },
        { value: 'challenge', label: 'Challenges', icon: < Trophy className = "w-4 h-4" / > },
        { value: 'workout', label: 'Workouts', icon: < Dumbbell className = "w-4 h-4" / > },
        { value: 'advice', label: 'Advice', icon: < MessageCircle className = "w-4 h-4" / > },
        { value: 'motivation', label: 'Motivation', icon: < Flame className = "w-4 h-4" / > },
        { value: 'question', label: 'Questions', icon: < MessageSquare className = "w-4 h-4" / > }
    ];

    const handleCreatePost = () => {
        if (newPost.title && newPost.content) {
            // In a real app, this would send to backend
            console.log('Creating post:', newPost);
            setNewPost({ title: '', content: '', category: 'general' });
            setShowCreatePost(false);
        }
    };

    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'bg-green-100 text-green-800',
            'Intermediate': 'bg-blue-100 text-blue-800',
            'Advanced': 'bg-purple-100 text-purple-800',
            'Expert': 'bg-orange-100 text-orange-800',
            'Master': 'bg-red-100 text-red-800',
            'Elite': 'bg-yellow-100 text-yellow-800'
        };
        return colors[level] || colors['Beginner'];
    };

    const getCategoryColor = (category) => {
        const colors = {
            'challenge': 'bg-blue-100 text-blue-800',
            'workout': 'bg-green-100 text-green-800',
            'advice': 'bg-purple-100 text-purple-800',
            'motivation': 'bg-orange-100 text-orange-800',
            'question': 'bg-red-100 text-red-800',
            'general': 'bg-gray-100 text-gray-800'
        };
        return colors[category] || colors['general'];
    };

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900" >
        <
        div className = "container mx-auto px-4 py-8" > { /* Header */ } <
        motion.div initial = {
            { opacity: 0, y: 20 } }
        animate = {
            { opacity: 1, y: 0 } }
        transition = {
            { duration: 0.6 } }
        className = "text-center mb-8" >
        <
        h1 className = "text-4xl font-bold text-gray-900 dark:text-white mb-4" >
        Fitness Community <
        /h1> <
        p className = "text-xl text-gray-600 dark:text-gray-400" >
        Connect, inspire, and grow with fitness enthusiasts from around the world <
        /p> <
        /motion.div>

        { /* Community Stats */ } <
        motion.div initial = {
            { opacity: 0, y: 20 } }
        animate = {
            { opacity: 1, y: 0 } }
        transition = {
            { duration: 0.6, delay: 0.1 } }
        className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" >
        <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Users className = "w-8 h-8 text-blue-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.totalMembers.toLocaleString() } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Total Members < /div> <
        /div> <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Activity className = "w-8 h-8 text-green-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.activeToday.toLocaleString() } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Active Today < /div> <
        /div> <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Trophy className = "w-8 h-8 text-yellow-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.challengesCompleted.toLocaleString() } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Challenges < /div> <
        /div> <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Dumbbell className = "w-8 h-8 text-purple-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.totalWorkouts.toLocaleString() } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Workouts < /div> <
        /div> <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Star className = "w-8 h-8 text-orange-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.averageRating } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Avg Rating < /div> <
        /div> <
        div className = "bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg" >
        <
        Crown className = "w-8 h-8 text-red-500 mx-auto mb-2" / >
        <
        div className = "text-2xl font-bold text-gray-900 dark:text-white" > { communityStats.topContributors } <
        /div> <
        div className = "text-sm text-gray-600 dark:text-gray-400" > Top Contributors < /div> <
        /div> <
        /motion.div>

        { /* Navigation Tabs */ } <
        motion.div initial = {
            { opacity: 0, y: 20 } }
        animate = {
            { opacity: 1, y: 0 } }
        transition = {
            { duration: 0.6, delay: 0.2 } }
        className = "bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg mb-8" >
        <
        div className = "flex flex-wrap gap-2" > {
            [
                { id: 'overview', label: 'Overview', icon: < Users className = "w-4 h-4" / > },
                { id: 'members', label: 'Top Members', icon: < Trophy className = "w-4 h-4" / > },
                { id: 'discussions', label: 'Discussions', icon: < MessageCircle className = "w-4 h-4" / > },
                { id: 'events', label: 'Events', icon: < Calendar className = "w-4 h-4" / > },
                { id: 'achievements', label: 'Achievements', icon: < Award className = "w-4 h-4" / > }
            ].map((tab) => ( <
                button key = { tab.id }
                onClick = {
                    () => setActiveTab(tab.id) }
                className = { `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                                }` } >
                { tab.icon } <
                span > { tab.label } < /span> <
                /button>
            ))
        } <
        /div> <
        /motion.div>

        { /* Content based on active tab */ } {
            activeTab === 'overview' && ( <
                motion.div initial = {
                    { opacity: 0, y: 20 } }
                animate = {
                    { opacity: 1, y: 0 } }
                transition = {
                    { duration: 0.6, delay: 0.3 } }
                className = "grid grid-cols-1 lg:grid-cols-3 gap-8" >
                { /* Top Members Preview */ } <
                div className = "lg:col-span-1" >
                <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center" >
                <
                Crown className = "w-5 h-5 text-yellow-500 mr-2" / >
                Top Members <
                /h3> <
                div className = "space-y-4" > {
                    topMembers.slice(0, 3).map((member, index) => ( <
                        div key = { member.id }
                        className = "flex items-center space-x-3" >
                        <
                        div className = "relative" >
                        <
                        img src = { member.avatar }
                        alt = { member.name }
                        className = "w-12 h-12 rounded-full object-cover" /
                        > {
                            member.isOnline && ( <
                                div className = "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" > < /div>
                            )
                        } <
                        /div> <
                        div className = "flex-1" >
                        <
                        div className = "font-semibold text-gray-900 dark:text-white" > { member.name } <
                        /div> <
                        div className = "text-sm text-gray-600 dark:text-gray-400" > { member.specialty } <
                        /div> <
                        /div> <
                        div className = "text-right" >
                        <
                        div className = "text-lg font-bold text-blue-600" > { member.points } <
                        /div> <
                        div className = "text-xs text-gray-500" > pts < /div> <
                        /div> <
                        /div>
                    ))
                } <
                /div> <
                button className = "w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" >
                View All Members <
                /button> <
                /div> <
                /div>

                { /* Recent Activity */ } <
                div className = "lg:col-span-2" >
                <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center" >
                <
                Activity className = "w-5 h-5 text-green-500 mr-2" / >
                Recent Activity <
                /h3> <
                div className = "space-y-4" > {
                    recentPosts.slice(0, 3).map((post) => ( <
                        div key = { post.id }
                        className = "border-b border-gray-200 dark:border-slate-700 pb-4 last:border-b-0" >
                        <
                        div className = "flex items-start space-x-3" >
                        <
                        img src = { post.avatar }
                        alt = { post.author }
                        className = "w-10 h-10 rounded-full object-cover" /
                        >
                        <
                        div className = "flex-1" >
                        <
                        div className = "flex items-center space-x-2 mb-1" >
                        <
                        span className = "font-semibold text-gray-900 dark:text-white" > { post.author } <
                        /span> <
                        span className = "text-sm text-gray-500" > { post.timestamp } <
                        /span> <
                        /div> <
                        h4 className = "font-medium text-gray-900 dark:text-white mb-1" > { post.title } <
                        /h4> <
                        p className = "text-sm text-gray-600 dark:text-gray-400 line-clamp-2" > { post.content } <
                        /p> <
                        div className = "flex items-center space-x-4 mt-2 text-sm text-gray-500" >
                        <
                        span className = "flex items-center space-x-1" >
                        <
                        Heart className = "w-4 h-4" / >
                        <
                        span > { post.likes } < /span> <
                        /span> <
                        span className = "flex items-center space-x-1" >
                        <
                        MessageSquare className = "w-4 h-4" / >
                        <
                        span > { post.comments } < /span> <
                        /span> <
                        span className = "flex items-center space-x-1" >
                        <
                        Share className = "w-4 h-4" / >
                        <
                        span > { post.shares } < /span> <
                        /span> <
                        /div> <
                        /div> <
                        /div> <
                        /div>
                    ))
                } <
                /div> <
                /div> <
                /div> <
                /motion.div>
            )
        }

        {
            activeTab === 'members' && ( <
                motion.div initial = {
                    { opacity: 0, y: 20 } }
                animate = {
                    { opacity: 1, y: 0 } }
                transition = {
                    { duration: 0.6, delay: 0.3 } }
                className = "space-y-6" >
                <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                h3 className = "text-2xl font-bold text-gray-900 dark:text-white mb-6" >
                Community Leaders <
                /h3> <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                    topMembers.map((member, index) => ( <
                        motion.div key = { member.id }
                        initial = {
                            { opacity: 0, y: 20 } }
                        animate = {
                            { opacity: 1, y: 0 } }
                        transition = {
                            { duration: 0.6, delay: index * 0.1 } }
                        className = "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300" >
                        <
                        div className = "relative mb-4" >
                        <
                        img src = { member.avatar }
                        alt = { member.name }
                        className = "w-20 h-20 rounded-full object-cover mx-auto border-4 border-white dark:border-slate-600" /
                        > {
                            member.isOnline && ( <
                                div className = "absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-600" > < /div>
                            )
                        } {
                            index === 0 && ( <
                                div className = "absolute -top-2 -right-2" >
                                <
                                Crown className = "w-8 h-8 text-yellow-500" / >
                                <
                                /div>
                            )
                        } <
                        /div> <
                        h4 className = "text-lg font-bold text-gray-900 dark:text-white mb-2" > { member.name } <
                        /h4> <
                        span className = { `inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getLevelColor(member.level)}` } > { member.level } <
                        /span> <
                        div className = "space-y-2 text-sm" >
                        <
                        div className = "flex justify-between" >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > Points: < /span> <
                        span className = "font-semibold text-blue-600" > { member.points.toLocaleString() } < /span> <
                        /div> <
                        div className = "flex justify-between" >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > Achievements: < /span> <
                        span className = "font-semibold text-green-600" > { member.achievements } < /span> <
                        /div> <
                        div className = "flex justify-between" >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > Streak: < /span> <
                        span className = "font-semibold text-orange-600" > { member.streak }
                        days < /span> <
                        /div> <
                        div className = "flex justify-between" >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > Followers: < /span> <
                        span className = "font-semibold text-purple-600" > { member.followers.toLocaleString() } < /span> <
                        /div> <
                        /div> <
                        div className = "mt-4 text-xs text-gray-500" > { member.specialty } <
                        /div> <
                        button className = "w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" >
                        Follow <
                        /button> <
                        /motion.div>
                    ))
                } <
                /div> <
                /div> <
                /motion.div>
            )
        }

        {
            activeTab === 'discussions' && ( <
                motion.div initial = {
                    { opacity: 0, y: 20 } }
                animate = {
                    { opacity: 1, y: 0 } }
                transition = {
                    { duration: 0.6, delay: 0.3 } }
                className = "space-y-6" >
                { /* Search and Filters */ } <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                div className = "flex flex-col md:flex-row gap-4" >
                <
                div className = "flex-1 relative" >
                <
                Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" / >
                <
                input type = "text"
                placeholder = "Search discussions..."
                value = { searchTerm }
                onChange = {
                    (e) => setSearchTerm(e.target.value) }
                className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500" /
                >
                <
                /div> <
                select value = { selectedCategory }
                onChange = {
                    (e) => setSelectedCategory(e.target.value) }
                className = "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" >
                {
                    categories.map(category => ( <
                        option key = { category.value }
                        value = { category.value } > { category.label } <
                        /option>
                    ))
                } <
                /select> <
                button onClick = {
                    () => setShowCreatePost(true) }
                className = "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2" >
                <
                MessageCircle className = "w-4 h-4" / >
                <
                span > New Post < /span> <
                /button> <
                /div> <
                /div>

                { /* Discussion Posts */ } <
                div className = "space-y-4" > {
                    recentPosts.map((post, index) => ( <
                        motion.div key = { post.id }
                        initial = {
                            { opacity: 0, y: 20 } }
                        animate = {
                            { opacity: 1, y: 0 } }
                        transition = {
                            { duration: 0.6, delay: index * 0.1 } }
                        className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                        <
                        div className = "flex items-start space-x-4" >
                        <
                        img src = { post.avatar }
                        alt = { post.author }
                        className = "w-12 h-12 rounded-full object-cover" /
                        >
                        <
                        div className = "flex-1" >
                        <
                        div className = "flex items-center justify-between mb-2" >
                        <
                        div className = "flex items-center space-x-2" >
                        <
                        span className = "font-semibold text-gray-900 dark:text-white" > { post.author } <
                        /span> <
                        span className = "text-sm text-gray-500" > { post.timestamp } <
                        /span> <
                        /div> <
                        span className = { `px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}` } > { post.category } <
                        /span> <
                        /div> <
                        h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-2" > { post.title } <
                        /h3> <
                        p className = "text-gray-600 dark:text-gray-400 mb-4" > { post.content } <
                        /p> <
                        div className = "flex flex-wrap gap-2 mb-4" > {
                            post.tags.map((tag, tagIndex) => ( <
                                span key = { tagIndex }
                                className = "px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded-full" >
                                { tag } <
                                /span>
                            ))
                        } <
                        /div> <
                        div className = "flex items-center justify-between" >
                        <
                        div className = "flex items-center space-x-6" >
                        <
                        button className = "flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors" >
                        <
                        Heart className = "w-5 h-5" / >
                        <
                        span > { post.likes } < /span> <
                        /button> <
                        button className = "flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors" >
                        <
                        MessageSquare className = "w-5 h-5" / >
                        <
                        span > { post.comments } < /span> <
                        /button> <
                        button className = "flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors" >
                        <
                        Share className = "w-5 h-5" / >
                        <
                        span > { post.shares } < /span> <
                        /button> <
                        /div> <
                        div className = "flex items-center space-x-2" >
                        <
                        button className = "p-2 text-gray-400 hover:text-gray-600 transition-colors" >
                        <
                        Bookmark className = "w-5 h-5" / >
                        <
                        /button> <
                        button className = "p-2 text-gray-400 hover:text-gray-600 transition-colors" >
                        <
                        MoreHorizontal className = "w-5 h-5" / >
                        <
                        /button> <
                        /div> <
                        /div> <
                        /div> <
                        /div> <
                        /motion.div>
                    ))
                } <
                /div> <
                /motion.div>
            )
        }

        {
            activeTab === 'events' && ( <
                motion.div initial = {
                    { opacity: 0, y: 20 } }
                animate = {
                    { opacity: 1, y: 0 } }
                transition = {
                    { duration: 0.6, delay: 0.3 } }
                className = "space-y-6" >
                <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                h3 className = "text-2xl font-bold text-gray-900 dark:text-white mb-6" >
                Upcoming Events <
                /h3> <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                    upcomingEvents.map((event, index) => ( <
                        motion.div key = { event.id }
                        initial = {
                            { opacity: 0, y: 20 } }
                        animate = {
                            { opacity: 1, y: 0 } }
                        transition = {
                            { duration: 0.6, delay: index * 0.1 } }
                        className = "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300" >
                        <
                        div className = "flex items-center justify-between mb-4" >
                        <
                        Calendar className = "w-8 h-8 text-purple-500" / >
                        <
                        span className = "text-sm text-purple-600 dark:text-purple-400 font-medium" > { event.category } <
                        /span> <
                        /div> <
                        h4 className = "text-lg font-bold text-gray-900 dark:text-white mb-2" > { event.title } <
                        /h4> <
                        p className = "text-gray-600 dark:text-gray-400 text-sm mb-4" > { event.description } <
                        /p> <
                        div className = "space-y-2 text-sm mb-4" >
                        <
                        div className = "flex items-center space-x-2" >
                        <
                        Clock className = "w-4 h-4 text-gray-500" / >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > { event.date }
                        at { event.time } <
                        /span> <
                        /div> <
                        div className = "flex items-center space-x-2" >
                        <
                        MapPin className = "w-4 h-4 text-gray-500" / >
                        <
                        span className = "text-gray-600 dark:text-gray-400" > { event.location } <
                        /span> <
                        /div> <
                        /div> <
                        div className = "flex items-center justify-between mb-4" >
                        <
                        div className = "text-sm text-gray-600 dark:text-gray-400" > { event.attendees }
                        /{event.maxAttendees} attending <
                        /div> <
                        div className = "w-24 bg-gray-200 rounded-full h-2" >
                        <
                        div className = "bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style = {
                            { width: `${(event.attendees / event.maxAttendees) * 100}%` } } >
                        < /div> <
                        /div> <
                        /div> <
                        button className = "w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors" >
                        Join Event <
                        /button> <
                        /motion.div>
                    ))
                } <
                /div> <
                /div> <
                /motion.div>
            )
        }

        {
            activeTab === 'achievements' && ( <
                motion.div initial = {
                    { opacity: 0, y: 20 } }
                animate = {
                    { opacity: 1, y: 0 } }
                transition = {
                    { duration: 0.6, delay: 0.3 } }
                className = "space-y-6" >
                <
                div className = "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg" >
                <
                h3 className = "text-2xl font-bold text-gray-900 dark:text-white mb-6" >
                Your Achievements <
                /h3> <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                    achievements.map((achievement, index) => ( <
                        motion.div key = { achievement.id }
                        initial = {
                            { opacity: 0, y: 20 } }
                        animate = {
                            { opacity: 1, y: 0 } }
                        transition = {
                            { duration: 0.6, delay: index * 0.1 } }
                        className = { `p-6 rounded-xl border-2 transition-all duration-300 ${
                                            achievement.unlocked
                                                ? 'bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-slate-700 dark:to-slate-600 border-yellow-200 dark:border-yellow-600'
                                                : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'
                                        }` } >
                        <
                        div className = "text-center" >
                        <
                        div className = { `text-4xl mb-3 ${achievement.unlocked ? 'opacity-100' : 'opacity-30'}` } > { achievement.icon } <
                        /div> <
                        h4 className = { `text-lg font-bold mb-2 ${
                                                achievement.unlocked
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }` } > { achievement.name } <
                        /h4> <
                        p className = { `text-sm ${
                                                achievement.unlocked
                                                    ? 'text-gray-600 dark:text-gray-300'
                                                    : 'text-gray-400 dark:text-gray-500'
                                            }` } > { achievement.description } <
                        /p> {
                            achievement.unlocked && ( <
                                div className = "mt-3" >
                                <
                                Award className = "w-6 h-6 text-yellow-500 mx-auto" / >
                                <
                                /div>
                            )
                        } <
                        /div> <
                        /motion.div>
                    ))
                } <
                /div> <
                /div> <
                /motion.div>
            )
        } <
        /div>

        { /* Create Post Modal */ } {
            showCreatePost && ( <
                motion.div initial = {
                    { opacity: 0 } }
                animate = {
                    { opacity: 1 } }
                exit = {
                    { opacity: 0 } }
                className = "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick = {
                    () => setShowCreatePost(false) } >
                <
                motion.div initial = {
                    { scale: 0.8, opacity: 0 } }
                animate = {
                    { scale: 1, opacity: 1 } }
                className = "bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full"
                onClick = {
                    (e) => e.stopPropagation() } >
                <
                h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-4" >
                Create New Post <
                /h3> <
                div className = "space-y-4" >
                <
                input type = "text"
                placeholder = "Post title..."
                value = { newPost.title }
                onChange = {
                    (e) => setNewPost({...newPost, title: e.target.value }) }
                className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" /
                >
                <
                select value = { newPost.category }
                onChange = {
                    (e) => setNewPost({...newPost, category: e.target.value }) }
                className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" >
                {
                    categories.slice(1).map(category => ( <
                        option key = { category.value }
                        value = { category.value } > { category.label } <
                        /option>
                    ))
                } <
                /select> <
                textarea placeholder = "What's on your mind?"
                value = { newPost.content }
                onChange = {
                    (e) => setNewPost({...newPost, content: e.target.value }) }
                rows = { 6 }
                className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none" /
                >
                <
                /div> <
                div className = "flex justify-end space-x-3 mt-6" >
                <
                button onClick = {
                    () => setShowCreatePost(false) }
                className = "px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors" >
                Cancel <
                /button> <
                button onClick = { handleCreatePost }
                className = "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors" >
                Create Post <
                /button> <
                /div> <
                /motion.div> <
                /motion.div>
            )
        } <
        /div>
    );
};

export default CommunityPage;