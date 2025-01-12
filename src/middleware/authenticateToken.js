const jwt = require('jsonwebtoken');

// Middleware לאימות טוקן
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // בדיקת הטוקן
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // שמירת פרטי המשתמש ב-request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
