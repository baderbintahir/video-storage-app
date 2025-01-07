const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // DIFFERENCE
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // DIFFERENCE
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
