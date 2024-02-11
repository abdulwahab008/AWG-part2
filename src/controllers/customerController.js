// controllers/customerController.js
const customerModel = require('../models/customerModel');
async function createCustomer(req, res) {
    const customerData = req.body;

    // Validate that the 'name' field is present and not empty
    if (!customerData.name || !customerData.name.trim()) {
        return res.status(400).json({ error: 'Name is required and cannot be empty' });
    }

    try {
        const customerId = await customerModel.createCustomer(customerData);
        res.status(201).json({ id: customerId, message: 'Customer created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getCustomers(req, res) {
  try {
    const customers = await customerModel.getCustomers();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getAllCustomers(req, res) {
    try {
      const customers = await customerModel.getCustomers();
      res.json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  module.exports = {
    createCustomer,
    getCustomers,
    getAllCustomers
   
  };