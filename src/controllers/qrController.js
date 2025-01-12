const { response } = require('express');
const QR = require('../models/qr');
const User = require('../models/user');
const axios = require('axios');

// Get all QRs for a user
const getQrs = async (req, res) => {
  try {
    const qrs = await QR.find({ user: req.params.userId });
    res.status(200).json(qrs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching QRs', error: err });
  }
};

// Get a single QR
const getQr = async (req, res) => {
  try {
    const qr = await QR.findById(req.params.id);
    if (!qr) {
      return res.status(404).json({ message: 'QR not found' });
    }
    res.status(200).json(qr);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching QR', error: err });
  }
};

// Add a new QR
//🧡 אני רוצה לאפשר יצירה לא לפי user
const addQr = async (req, res) => {
  const { userId, expiration, description } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newQr = new QR({ user: userId, expiration, description });
    await newQr.save();
    user.qrs.push(newQr);
    await user.save();

    // יצירת URL ל-API של Google Chart API ליצירת QR
    const qrUrl = `https://unlosted/${newQr._id}`;
    const googleQRUrl = `https://quickchart.io/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(qrUrl)}`;
    const response = await axios.get(googleQRUrl, { responseType: 'arraybuffer' });
    
    const qrBuffer = Buffer.from(response.data, 'binary');

    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', 'inline; filename=qr_code.png');
    res.send(qrBuffer);

    // res.status(201).json(newQr);
  } catch (err) {
    console.log(response);
    res.status(500).json({ message: 'Error creating QR', error: err });
  }
};

// Update QR
const updateQr = async (req, res) => {
  try {
    const qr = await QR.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!qr) {
      return res.status(404).json({ message: 'QR not found' });
    }
    res.status(200).json(qr);
  } catch (err) {
    res.status(500).json({ message: 'Error updating QR', error: err });
  }
};

// Delete QR
const deleteQr = async (req, res) => {
  try {
    const qr = await QR.findByIdAndDelete(req.params.id);
    if (!qr) {
      return res.status(404).json({ message: 'QR not found' });
    }
    res.status(200).json({ message: 'QR deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting QR', error: err });
  }
};

module.exports = {
  getQrs,
  getQr,
  addQr,
  updateQr,
  deleteQr
};
