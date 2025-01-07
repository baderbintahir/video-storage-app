// src/services/videoService.js
const { gfs } = require('../config/db');
const Video = require('../models/videoModel');
const mongoose = require('mongoose');
const fs = require('fs');

// Upload video file to GridFS
const uploadVideo = async (file, videoData) => {
  const video = new Video({
    title: videoData.title,
    description: videoData.description,
    favorite: false,
    videoFileId: file.id,
  });
  await video.save();
  return video;
};

// Get all videos
const getAllVideos = async () => {
  return await Video.find().sort({ createdAt: -1 });
};

// Get video by ID
const getVideoById = async (id) => {
  return await Video.findById(id);
};

// Mark/unmark video as favorite
const toggleFavorite = async (id) => {
  const video = await Video.findById(id);
  if (!video) throw new Error('Video not found');
  video.favorite = !video.favorite;
  await video.save();
  return video;
};

module.exports = { uploadVideo, getAllVideos, getVideoById, toggleFavorite };
