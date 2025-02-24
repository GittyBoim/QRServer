const jwt = require('jsonwebtoken');

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Token verify
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Saving user information in the request
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;
