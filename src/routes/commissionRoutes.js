// commissionRoutes.js
const express = require('express');
const commissionController = require('../controllers/commissionController');

const router = express.Router();

router.post('/saveCommission', commissionController.saveCommission);
router.get('/getCommissions', commissionController.getCommissions);
module.exports = router;
