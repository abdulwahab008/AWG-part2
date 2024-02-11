// models/customerModel.js

const db = require('./db'); // Assuming you have the db.js file

async function createCustomer(customerData) {
  const { name, address, cnic, phone } = customerData;
  const query = 'INSERT INTO Customer (name, address, cnic, phone_number) VALUES (?, ?, ?, ?)';
  const values = [name || null, address || null, cnic || null, phone || null]; // Set undefined values to null

  try {
    const [result] = await db.execute(query, values);
    return result.insertId; // Return the ID of the newly inserted customer
  } catch (error) {
    throw error;
  }
}

async function getCustomers() {
  const query = 'SELECT * FROM Customer';

  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createCustomer,
  getCustomers
  
};
