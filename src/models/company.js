const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  qrs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QR',
    },
  ],
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
