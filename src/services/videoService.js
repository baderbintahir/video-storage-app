const Video = require('../models/videoModel');

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
