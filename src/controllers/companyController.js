<<<<<<< HEAD
const Company = require('../models/company');
=======
const Company = require('../models/Company');
>>>>>>> eaabdc37dc93da08ce99b12d51a662b0f557c28a
const bcrypt = require('bcrypt');

// Get all Companys
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('qrs');
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// Get a single Company
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).populate('qrs');
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

// Add a new Company
const addCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      email,
      password: hashedPassword
    });
    await newCompany.save();

    res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

// Update Company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const updatedData = {};

    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully', company: deletedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  addCompany,
  updateCompany,
  deleteCompany
};

