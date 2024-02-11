// src/models/salesModel.js

const pool = require('./db');

async function fetchCategoryNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT DISTINCT categoryName FROM products');
        connection.release();

        const categoryNames = rows.map(row => row.categoryName);

        return categoryNames;
    } catch (error) {
        console.error('Error fetching category names:', error);
        throw error;
    }
}

async function fetchProductsByCategory(categoryName) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT productName, price FROM products WHERE categoryName = ?', [categoryName]);
        connection.release();

        const products = rows;

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function saveSalesToDatabase(data) {
    try {
        const connection = await pool.getConnection();

        // Extract data from the request body
        const { date, categoryName, productName, quantity, price, cost, profit, total } = data;

        // Insert sales data into the 'sales' table
        await connection.query(
            'INSERT INTO sales (date, categoryName, productName, quantity, price, cost, profit, total) VALUES (?, ?, ?, ?, ?, ?,?, ?)',
            [date, categoryName, productName, quantity, price, cost, profit, total]
        );

        connection.release();
    } catch (error) {
        console.error('Error saving to database:', error);
        throw error;
    }
}
async function fetchSalesData() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM sales');
        connection.release();

        const salesData = rows;

        return salesData;
    } catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
}
async function getSalesReport(dateRange) {
    try {
      
  
      const query = 'SELECT * FROM sales WHERE date BETWEEN ? AND ?'; // Replace ... with your conditions
      const [sales] = await pool.execute(query, [dateRange.fromDate, dateRange.toDate]);
      return sales;
    } catch (error) {
      throw error;
    }
  }
  async function deleteSalesData(date, categoryName, productName) {
    try {
        console.log('Deleting Sales Data from Database:', { date, categoryName, productName });

        const connection = await pool.getConnection();

       

        // Check if the entry exists before attempting deletion
        const deleteResult = await connection.query('DELETE FROM sales WHERE date = ? AND categoryName = ? AND productName = ?', [date, categoryName, productName]);
        console.log('DELETE result:', deleteResult);

        if (deleteResult && deleteResult.affectedRows > 0) {
            console.log('Sales entry deleted from the database successfully');
        } else {
            console.log('Sales entry not found in the database');
        }

        connection.release();
    } catch (error) {
        console.error('Error deleting sales data from the database:', error);
        throw error;
    }
}



module.exports = {
    fetchCategoryNames,
    fetchProductsByCategory,
    saveSalesToDatabase,
    fetchSalesData,
    getSalesReport,
    deleteSalesData
};
