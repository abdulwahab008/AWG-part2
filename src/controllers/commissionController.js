// commissionController.js
const commissionModel = require('../models/commissionModel');

async function saveCommission(req, res) {
  try {
    console.log('Request received:', req.body);
    const commissionData = req.body;
    const commissionId = await commissionModel.saveCommission(commissionData);
    console.log('Commission saved successfully');
    res.json({ success: true, commissionId });
  } catch (error) {
    console.error('Error saving commission:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

async function getCommissions(req, res) {
  try {
    // Fetch specific columns (date, phone, service, discount) from the database
    const commissions = await commissionModel.getCommissions();
    
    // Extract only the needed columns
    const simplifiedCommissions = commissions.map(({ date, phone, amount, profit, service }) => ({
      date,
      phone,
      amount,
      profit,
      service
    }));

    res.json({ success: true, commissions: simplifiedCommissions });
  } catch (error) {
    console.error('Error fetching commissions:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

module.exports = {
  saveCommission,
  getCommissions,
};
