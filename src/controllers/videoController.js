// src/controllers/videoController.js
const videoService = require('../services/videoService');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { gfs } = require('../config/db');

// Set up GridFS storage for Multer
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'videos', // The collection name in GridFS
      filename: `${Date.now()}-${file.originalname}`, // File name with timestamp to avoid name conflicts
    };
  },
});

const upload = multer({ storage });

// Upload video (handles both file and metadata)
const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { title, description } = req.body;  // Extract title and description from request body
    const videoData = {
      title,
      description,
      filename: req.file.filename, // Store filename in the DB for reference
      fileId: req.file.id, // File ID in GridFS for future reference
    };

    const video = await videoService.uploadVideo(req.file, videoData);
    res.status(201).json(video);  // Respond with the created video info
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json(videos);  // Respond with all video data
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get a video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);  // Respond with the video data
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    res.status(400).json({ message: error.message });
  }
};

// Toggle video favorite status
const toggleFavorite = async (req, res) => {
  try {
    const video = await videoService.toggleFavorite(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);  // Respond with the updated video status
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadVideo,  // Video upload handler
  getAllVideos,  // Get all videos
  getVideoById,  // Get video by ID
  toggleFavorite,  // Toggle video favorite status
  upload,  // Multer middleware for file upload
};
