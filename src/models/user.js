const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  
  password: { 
    type: String, 
    required: true 
  },

  address: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true 
  },

  qrs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'QR' 
  }]
  
});

const User = mongoose.model('User', userSchema);
module.exports = User;
