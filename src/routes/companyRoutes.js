const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeSelfAccess = require('../middleware/authorizeSelfAccess');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', authenticateToken, authorizeAdmin, companyController.getCompanies);

router.get('/:id', authenticateToken, authorizeSelfAccess, companyController.getCompanyById);

router.post('/', companyController.addCompany);

router.put('/:id', authenticateToken, authorizeSelfAccess, companyController.updateCompany);

router.delete('/:id', authenticateToken, authorizeSelfAccess, companyController.deleteCompany);

module.exports = router;
