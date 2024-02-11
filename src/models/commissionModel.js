// commissionModel.js
const pool = require('./db');

async function saveCommission(commissionData) {
  try {
    const { date, phone, amount, discount, service, profit, discountAmount } = commissionData;
    const query = 'INSERT INTO commissions (date, phone, amount, discount, service, profit, discountAmount) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [date, phone, amount, discount, service, profit, discountAmount];
    const [result] = await pool.execute(query, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

async function getCommissions() {
  try {
    // Select only the required columns
    const query = 'SELECT date, phone, amount, profit, service FROM commissions';
    const [commissions] = await pool.execute(query);
    return commissions;
  } catch (error) {
    throw error;
  }
}
async function getCommissionReport(dateRange) {
  try {
 
    const query = 'SELECT * FROM commissions WHERE date BETWEEn ? AND ?'; // Replace ... with your conditions
    const [commissions] = await pool.execute(query, [dateRange.fromDate, dateRange.toDate]);
    return commissions;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveCommission,
  getCommissions,
  getCommissionReport
};
