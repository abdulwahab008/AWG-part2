const db = require('./db');

const { v4: uuidv4 } = require('uuid');

const Giveloan = {
  generateNumericUUID: () => {
    const hexUUID = uuidv4().replace(/-/g, ''); // Remove dashes from the hexadecimal UUID
    const numericUUID = BigInt(`0x${hexUUID}`).toString(); // Convert hexadecimal to decimal
    const sixDigitNumericUUID = numericUUID.slice(0, 6).padStart(6, '0'); // Ensure 6 digits

    return sixDigitNumericUUID;
  },

  saveLoan: async (loanData) => {
    try {
      const { name, amount, installment, monthly_installment, date } = loanData;
      const transaction_id = Giveloan.generateNumericUUID(); // Generate 6-digit numeric transaction_id

      // Validate that 'name' is not null or empty
      if (!name) {
        throw new Error('Name is required.');
      }

      const query = `
        INSERT INTO giveloan (date, transaction_id, name, amount, installment, monthly_installment)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [date, transaction_id, name, amount, installment, monthly_installment];

      const result = await db.query(query, values);

      return result.insertId; // Return the ID of the inserted record
    } catch (error) {
      throw error;
    }
  },

  getLoans: async () => {
    try {
      const query = `
        SELECT date, transaction_id, name, amount, installment, monthly_installment
        FROM giveloan
      `;

      const [rows] = await db.query(query);

      return rows; // Return the fetched records
    } catch (error) {
      throw error;
    }
  },
  getCustomerNames: async () => {
    try {
      const query = `
        SELECT name
        FROM customer
      `;

      const [rows] = await db.query(query);

      return rows.map(customer => customer.name);
    } catch (error) {
      throw error;
    }
  },
  
  giveLoanReport: async (dateRange) => {
    try {
      const query = 'SELECT * FROM giveloan WHERE date BETWEEN ? AND ?'; 
      const values = [dateRange.fromDate, dateRange.toDate];
      const [giveloan] = await db.query(query, values);
      return giveloan;
    } catch (error) {
      throw error;
    }
  },
  
};

module.exports = Giveloan;
