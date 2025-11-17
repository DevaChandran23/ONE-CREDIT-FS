import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return ( <
        >
        <
        Helmet >
        <
        title > Page Not Found - Fitness Challenge Community < /title> <
        meta name = "description"
        content = "The page you're looking for doesn't exist." / >
        <
        /Helmet>

        <
        div className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-12 px-4" >
        <
        div className = "text-center" >
        <
        motion.div initial = {
            { opacity: 0, scale: 0.8 } }
        animate = {
            { opacity: 1, scale: 1 } }
        transition = {
            { duration: 0.6 } }
        className = "mb-8" >
        <
        div className = "text-9xl font-bold text-blue-600 mb-4" > 404 < /div> <
        h1 className = "text-4xl font-bold text-gray-900 dark:text-white mb-4" >
        Page Not Found <
        /h1> <
        p className = "text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto" >
        Oops!The page you 're looking for doesn'
        t exist.It might have been moved or deleted. <
        /p> <
        /motion.div>

        <
        motion.div initial = {
            { opacity: 0, y: 20 } }
        animate = {
            { opacity: 1, y: 0 } }
        transition = {
            { duration: 0.6, delay: 0.2 } }
        className = "flex flex-col sm:flex-row gap-4 justify-center items-center" >
        <
        Link to = "/"
        className = "btn btn-primary btn-lg group" >
        <
        Home className = "w-5 h-5 mr-2 group-hover:scale-110 transition-transform" / >
        Go Home <
        /Link>

        <
        button onClick = {
            () => window.history.back() }
        className = "btn btn-outline btn-lg group" >
        <
        ArrowLeft className = "w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" / >
        Go Back <
        /button> <
        /motion.div> <
        /div> <
        /div> <
        />
    );
};

export default NotFoundPage;