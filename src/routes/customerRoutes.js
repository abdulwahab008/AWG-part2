// src/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Display the customer form
router.get('/add', (req, res) => {
  res.sendFile('public/customerForm.html', { root: __dirname + '/../' });
});

// Create a new customer (form submission)
router.post('/add', customerController.createCustomer);

// Get all customers
router.get('/all', customerController.getAllCustomers);

module.exports = router;