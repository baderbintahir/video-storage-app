const Video = require("../models/videoModel");

// Get all videos
const getAllVideos = async () => {
  return await Video.findAll();
};

// Get video by ID
const getVideoById = async (id) => {
  return await Video.findByPk(id);
};

// Save video
const saveVideo = async (videoData) => {
  return await Video.create(videoData);
};

// Update video by ID
const updateVideoById = async (id, videoData) => {
  const video = await Video.findByPk(id);
  if (!video) throw new Error('Video not found');
  return await video.update(videoData);
};

// Mark/unmark video as favorite
const toggleFavorite = async (id) => {
  const video = await Video.findByPk(id);
  if (!video) throw new Error('Video not found');
  video.favorite = !video.favorite;
  return await video.save();
};

module.exports = {
  getAllVideos,
  getVideoById,
  saveVideo,
  updateVideoById,
  toggleFavorite,
};
