const Giveloan = require('../models/giveloanModel');
const db = require('../models/db');
const GiveloanController = {
  submitLoan: async (req, res) => {
    try {
      const { name, amount, installment, monthly_installment, date } = req.body;

      // Validate that 'name' is not null or empty
      if (!name) {
        return res.status(400).json({ success: false, error: 'Name is required.' });
      }

      // Perform any necessary validation on the other fields before saving

      const result = await Giveloan.saveLoan({
        name,
        amount,
        installment,
        monthly_installment,
        date,
      });

      res.status(201).json({ success: true, loanId: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },

  getLoans: async (req, res) => {
    try {
      const loans = await Giveloan.getLoans();
      res.json(loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
      res.status(500).send('Internal Server Error');
    }
  },

updateTotalLoan: async (req, res) => {
  try {
      const { totalLoan } = req.body;

      const query = `
          UPDATE giveloan
          SET total_loan = ?
      `;

      const values = [totalLoan];

      await db.query(query, values);

      res.status(200).json({ success: true, message: 'Total loan updated successfully.' });
  } catch (error) {
      console.error('Error updating total loan:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},
getCustomerNames: async (req, res) => {
  try {
    const customerNames = await Giveloan.getCustomerNames();
    res.json(customerNames);
  } catch (error) {
    console.error('Error fetching customer names:', error);
    res.status(500).send('Internal Server Error');
  }
},

deleteLoan: async (req, res) => {
  try {
      const { transactionId } = req.params;

      const query = `
          DELETE FROM giveloan
          WHERE transaction_id = ?
      `;

      const values = [transactionId];

      await db.query(query, values);

      res.status(200).json({ success: true, message: 'Loan deleted successfully.' });
  } catch (error) {
      console.error('Error deleting loan:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
},


};




module.exports = GiveloanController;
