// src/models/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Punjab123',
  database: 'sales_stock_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool with promise wrapper
module.exports = pool.promise();
