const videoService = require("../services/videoService");

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get a video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(400).json({ message: error.message });
  }
};

// Save video
const saveVideo = async (req, res) => {
  try {
    const video = await videoService.saveVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateVideoById = async (req, res) => {
  try {
    const video = await videoService.updateVideoById(req.params.id, req.body);
    res.status(200).json(video);
  } catch (error) {
    console.error("Error updating video by ID:", error);
    res.status(400).json({ message: error.message });
  }
}

// Toggle video favorite status
const toggleFavorite = async (req, res) => {
  try {
    const video = await videoService.toggleFavorite(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  saveVideo,
  updateVideoById,
  toggleFavorite,
};
