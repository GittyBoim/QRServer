const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.get('/:userId', qrController.getQrs);
router.get('/qr/:id', qrController.getQr);
router.post('/', qrController.addQr);
router.put('/:id', qrController.updateQr);
router.delete('/:id', qrController.deleteQr);

module.exports = router;