# 🏋️‍♂️ Fitness Challenge Community

A full-stack web application for fitness enthusiasts to share goals, track progress, and participate in community challenges.

## ✨ Features

- **User Authentication**: Secure login/registration with JWT
- **Fitness Tracking**: Log workouts, set goals, track progress
- **Community Challenges**: Create and join fitness challenges
- **Progress Visualization**: Beautiful charts and progress tracking
- **Achievement System**: Badges and rewards for milestones
- **Social Features**: Comments, likes, and community interaction
- **Real-time Updates**: Live leaderboards and notifications
- **Responsive Design**: Mobile-first approach with smooth animations

## 🚀 Tech Stack

### Frontend
- React 18 with Hooks
- Framer Motion for animations
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Multer for file uploads
- Rate limiting and security middleware

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-challenge-community
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges` - Create new challenge
- `PUT /api/challenges/:id` - Update challenge
- `DELETE /api/challenges/:id` - Delete challenge

### Workouts
- `GET /api/workouts` - Get user workouts
- `POST /api/workouts` - Log new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## 🎨 Design Features

- **Smooth Animations**: Framer Motion powered transitions
- **Bold Color Scheme**: Energetic fitness-inspired palette
- **Modern UI**: Clean, intuitive interface
- **Responsive Layout**: Works on all devices
- **Interactive Elements**: Engaging user experience

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## 📱 Screenshots

*Screenshots will be added here*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@fitnesscommunity.com or create an issue in the repository.
