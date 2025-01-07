const Video = require("../models/videoModel");

// Get all videos
const getAllVideos = async () => {
  return await Video.find().sort({ createdAt: -1 });
};

// Get video by ID
const getVideoById = async (id) => {
  return await Video.findById(id);
};

// Save video
const saveVideo = async (videoData) => {
  const video = new Video(videoData);
  await video.save();
  return video;
};

// Update video by ID
const updateVideoById = async (id, videoData) => {
  const video = await Video.findByIdAndUpdate(id, videoData, { new: true });
  if (!video) throw new Error("Video not found");
  return video;
};

// Mark/unmark video as favorite
const toggleFavorite = async (id) => {
  const video = await Video.findById(id);
  if (!video) throw new Error("Video not found");

  const updatedVideo = await Video.findByIdAndUpdate(id, { favorite: !video.favorite }, { new: true });
  return updatedVideo;
};

module.exports = { getAllVideos, getVideoById, saveVideo, updateVideoById, toggleFavorite };
