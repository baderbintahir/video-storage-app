const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');
const { verifyToken } = require('../middlewares/authMiddleware');


// Get all videos
router.get('/', verifyToken, videoController.getAllVideos);

// Get video by ID
router.get('/:id', verifyToken, videoController.getVideoById);

// Save video
router.post('/', verifyToken, videoController.saveVideo);

// Update video by ID
router.put('/:id', verifyToken, videoController.updateVideoById);

// Toggle favorite
router.patch('/:id/favorite', verifyToken, videoController.toggleFavorite);

module.exports = router;
