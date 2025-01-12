const User = require('../models/user');
const QR = require('../models/qr');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('qrs');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Get a single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('qrs');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { name, password, address, phone, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password:hashedPassword, address, phone, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }

    await QR.updateMany({ user: user._id }, { $set: { user: null } });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User deleted successfully, associated QRs set to null' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
