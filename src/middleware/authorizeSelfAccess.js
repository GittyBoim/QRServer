const authorizeSelfAccess = (req, res, next) => {
    const { id } = req.params; 
    const user = req.user; 

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User not authenticated.' });
    }

    if (user.role !== 'admin' && user.id !== id) {
      return res.status(403).json({ message: 'Access denied. Not authorized to perform this action.' });
    };
      
   next();

    }

   
  
   module.exports = authorizeSelfAccess;