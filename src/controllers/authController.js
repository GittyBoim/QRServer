const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserController = require('../controllers/userController');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // User search by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: 'user'}, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};


const register = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  if (!name || !email || !password || !address || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Creating a new user via userController
    //עושה שגיאה על שימוש בפונקציה addUser
    const newUser = await UserController.addUser(name, email, password, address, phone);

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  
  }
};

module.exports = {
  login,
  register,
};
