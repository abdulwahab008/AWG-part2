// models/inventory.js

const pool = require('./db');

async function fetchProductNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT productName FROM products');
        connection.release();
        const productNames = rows.map(row => row.productName);
        return productNames;
    } catch (error) {
        console.error('Error fetching product names:', error);
        throw error;
    }
}

async function saveToDatabase(data) {
    try {
        const connection = await pool.getConnection();

        for (const row of data) {
            try {
                await connection.query('INSERT INTO inventory (date, product_name, supplier_name, price,cost, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                    row.date,
                    row.productName, 
                    row.supplierName, 
                    row.price,
                    row.cost,
                    row.quantity,
                    row.total
                ]);
            } catch (sqlError) {
                console.error('SQL Error:', sqlError);
                throw sqlError;
            }
        }

        connection.release();
    } catch (error) {
        console.error('Error saving to database:', error);
        throw error;
    }
}



async function fetchSupplierNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT supplier_name FROM suppliers');
        connection.release();
        
        const supplierNames = rows.map(row => row.supplier_name);

        return supplierNames;
    } catch (error) {
        console.error('Error fetching supplier names:', error);
        throw error;
    }
}

async function fetchInventoryData() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM inventory');
        connection.release();

        return rows.map(row => ({
            date: row.date,
            productName: row.product_name, 
            supplierName: row.supplier_name, 
            price: row.price,
            cost: row.cost,
            quantity: row.quantity,
            total: row.total
        }));
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        throw error;
    }
}

async function getStockReport(dateRange) {
    try {

  
      const query = 'SELECT * FROM inventory WHERE date BETWEEN ? AND ?'; 
      const [stock] = await pool.execute(query, [dateRange.fromDate, dateRange.toDate]);
      return stock;
    } catch (error) {
      throw error;
    }
  }

  async function updateInventoryQuantity(productName, soldQuantity) {
    try {
        const connection = await pool.getConnection();

        try {
            // Update inventory quantity after the sale
            await connection.query('UPDATE inventory SET quantity = quantity - ? WHERE product_name = ?', [
                soldQuantity,
                productName
            ]);

            // Fetch the updated inventory data
            const [updatedRows] = await connection.query('SELECT * FROM inventory WHERE product_name = ?', [productName]);
            const updatedInventoryItem = updatedRows[0];

            // Log the updated inventory data (optional)
            console.log('Updated Inventory Data:', updatedInventoryItem);
        } catch (sqlError) {
            console.error('SQL Error:', sqlError);
            throw sqlError;
        }

        connection.release();
    } catch (error) {
        console.error('Error updating inventory quantity:', error);
        throw error;
    }
}

module.exports = {
    fetchProductNames,
    saveToDatabase,
    fetchSupplierNames,
    fetchInventoryData,
    getStockReport,
    updateInventoryQuantity,
};
