// closingModel.js
const pool = require('./db');

async function saveClosing(closingData) {
    try {
        const { date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit, total } = closingData;

        const query = `
            INSERT INTO closing (date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit, total)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [date, telenorLoad, zongLoad, jazzLoad, ufoneLoad, easypaisa, jazzCash, loan, cash, bank, credit,total];

        const [result] = await pool.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

async function getAllClosing() {
    try {
        const query = 'SELECT * FROM closing';
        const [closingData] = await pool.execute(query);
        return closingData;
    } catch (error) {
        throw error;
    }
}
async function getClosingReport(dateRange) {
    try {
   
      const query = 'SELECT * FROM closing WHERE date BETWEEN ? AND ? '; 
      const [closing] = await pool.execute(query, [dateRange.fromDate, dateRange.toDate]);
      return closing;
    } catch (error) {
      throw error;
    }
  }

  async function getTotalLoan() {
    try {
        const query = 'SELECT total_loan FROM giveloan ORDER BY loan_id DESC LIMIT 1;';
        const [result] = await pool.execute(query);
        return result.length > 0 ? result[0].total_loan : 0;
    } catch (error) {
        throw error;
    }
}

  
module.exports = {
    saveClosing,
    getAllClosing,
    getClosingReport,
    getTotalLoan
};