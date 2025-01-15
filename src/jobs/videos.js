const { emailSuggestedVideos } = require('../mailer');
const Video = require('../models/videoModel');
const { getAllUsers } = require('../services/userService');

const emailVideosToEveryUser = async () => {
  try {
    console.log('Fetching videos and users');
    const videos = await Video.findAll();
    const users = await getAllUsers();

    console.log(`Fetched ${videos.length} videos and ${users.length} users`);
    await emailSuggestedVideos({
      videos,
      users,
    });
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Email Videos Error:', error);
  }
};

module.exports = { emailVideosToEveryUser };
