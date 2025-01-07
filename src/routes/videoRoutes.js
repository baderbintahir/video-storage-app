const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");

// Get all videos
router.get("/", videoController.getAllVideos);

// Get video by ID
router.get("/:id", videoController.getVideoById);

// Save video
router.post("/", videoController.saveVideo);

// Update video by ID
router.put("/:id", videoController.updateVideoById);

// Toggle favorite
router.patch("/:id/favorite", videoController.toggleFavorite);

module.exports = router;
