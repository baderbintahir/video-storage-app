const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
require('dotenv').config();

let gfs;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const conn = mongoose.connection;
    conn.once('open', () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('videos'); // specify the GridFS collection for video files
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, gfs };
