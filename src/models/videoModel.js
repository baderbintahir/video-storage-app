const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  favorite: { type: Boolean, default: false },
  video_url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
