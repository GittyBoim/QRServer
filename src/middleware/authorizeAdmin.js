// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
  
module.exports = authorizeAdmin;