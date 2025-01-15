const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register new user
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const user = await User.create({ username, email, password });
  return user;
};

// Login and return JWT
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
  return { user, token };
};

module.exports = { registerUser, loginUser };
