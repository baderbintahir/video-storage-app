const express = require('express');
const { connectDB } = require('./config/db');

const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/video', authMiddleware, videoRoutes);

module.exports = app;
