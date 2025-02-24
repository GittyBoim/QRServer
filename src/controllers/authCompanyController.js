const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Company = require('../models/company');

// Login function for Company
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: company._id, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};

// Register function for Company
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const newCompany = new Company({
      email,
      password: hashedPassword,
    });

    await newCompany.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newCompany._id, email: newCompany.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      company: {
        id: newCompany._id,
        email: newCompany.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  login,
  register,
};


//💗
//register לא משתמש בפונקציה  addCompany