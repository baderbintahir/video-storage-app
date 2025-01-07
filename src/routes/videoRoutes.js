// src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Upload video
router.post('/', verifyToken, videoController.upload.single('videoFile'), videoController.uploadVideo);

// Get all videos
router.get('/', verifyToken, videoController.getAllVideos);

// Get video by ID
router.get('/:id', verifyToken, videoController.getVideoById);

// Toggle favorite
router.patch('/:id/favorite', verifyToken, videoController.toggleFavorite);

module.exports = router;
