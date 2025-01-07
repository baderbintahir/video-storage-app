// src/models/videoModel.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  favorite: { type: Boolean, default: false },
  videoFileId: { type: mongoose.Schema.Types.ObjectId, required: true },  // Store file reference ID
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
