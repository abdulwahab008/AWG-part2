// src/routes/giveloanRoutes.js
const express = require('express');
const GiveloanController = require('../controllers/giveloanController');

const router = express.Router();

// Define the route for submitting a loan
router.post('/submit_loan', GiveloanController.submitLoan);
router.get('/loans', GiveloanController.getLoans);
router.post('/update_total_loan', GiveloanController.updateTotalLoan);
// Inside giveloanRoutes.js
router.get('/customer_names', GiveloanController.getCustomerNames);
router.delete('/delete_loan/:transactionId', GiveloanController.deleteLoan);
module.exports = router;
