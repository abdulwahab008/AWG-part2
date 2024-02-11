// src/routes/receiveloanRoutes.js
const express = require('express');
const router = express.Router();
const receiveloanController = require('../controllers/receiveloanController');

// Receive loan route
router.post('/submit_loan', receiveloanController.receiveLoan);
router.post('/search', receiveloanController.searchTransaction);
router.post('/monthly_installment_amount', receiveloanController.getMonthlyInstallmentAmountHandler); // Add this route
router.get('/fetch_all', receiveloanController.fetchAllData);
router.delete('/delete_loan/:transactionId', receiveloanController.deleteLoan);
module.exports = router;
