const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
    },

  date: { 
      type: Date, 
      default: Date.now 
    },

  expiration: { 
    type: Date, 
    required: "true" 
  },

  description: { 
    type: String, 
    required: true 
  }

});

const QR = mongoose.model('QR', qrSchema);
module.exports = QR;
