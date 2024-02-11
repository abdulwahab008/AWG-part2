// reportRoutes.js
const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.post('/generateReport', reportController.generateReport);

module.exports = router;
