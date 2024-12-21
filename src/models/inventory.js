// models/inventory.js

const pool = require('./db');

async function fetchCategoryNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT DISTINCT categoryName FROM products WHERE categoryName IS NOT NULL ORDER BY categoryName');
        connection.release();
        
        return rows.map(row => ({
            name: row.categoryName
        }));
    } catch (error) {
        console.error('Error fetching category names:', error);
        throw error;
    }
}

async function fetchProductsByCategory(categoryName) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT productName, sku, price, cost FROM products WHERE categoryName = ? ORDER BY productName',
            [categoryName]
        );
        connection.release();
        
        return rows;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}
async function saveToDatabase(data) {
    let connection;

    try {
        connection = await pool.getConnection();

        for (const row of data) {
            try {
                await connection.query(
                    'INSERT INTO inventory (date, category_name, product_name, supplier_name, sku, price, cost, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [
                        row.date,
                        row.categoryName,
                        row.productName, 
                        row.supplierName,
                        row.sku,
                        row.price,
                        row.cost,
                        row.quantity,
                        row.total
                    ]
                );
            } catch (sqlError) {
                console.error('SQL Error:', sqlError);
                throw sqlError; 
            }
        }
    } catch (error) {
        console.error('Error saving data to the database:', error);
        throw error; 
    } finally {
        if (connection) connection.release();
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
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`
            SELECT 
                id,
                DATE_FORMAT(date, '%Y-%m-%d') as date,
                category_name,
                product_name,
                supplier_name,
                price,
                cost,
                quantity,
                total
            FROM inventory
            ORDER BY date DESC
        `);
        
    
        return rows.map(row => ({
            id: row.id,
            date: row.date,
            categoryName: row.category_name,
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
    } finally {
        connection.release();
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
         
            await connection.query('UPDATE inventory SET quantity = quantity - ? WHERE product_name = ?', [
                soldQuantity,
                productName
            ]);
            const [updatedRows] = await connection.query('SELECT * FROM inventory WHERE product_name = ?', [productName]);
            const updatedInventoryItem = updatedRows[0];


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

async function deleteInventoryItemById(id) {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid ID provided');
    }

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('DELETE FROM inventory WHERE id = ?', [Number(id)]);
        if (result.affectedRows === 0) {
            throw new Error('Item not found');
        }
        return result;
    } catch (error) {
        console.error('SQL Error:', error);
        throw error;
    } finally {
        connection.release();
    }
}
async function updateInventoryItem(id, data) {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid ID provided');
    }


    if (!data.sku) {
        throw new Error('SKU cannot be null or empty');
    }

    const connection = await pool.getConnection();
    try {

        console.log('Updating inventory with data:', data);

        const [result] = await connection.query(
            `UPDATE inventory 
            SET date = ?,
                category_name = ?,
                product_name = ?,
                supplier_name = ?,
                sku = ?,
                price = ?,
                cost = ?,
                quantity = ?,
                total = ?
            WHERE id = ?`,
            [
                data.date,
                data.categoryName,
                data.productName,
                data.supplierName,
                data.sku,
                data.price,
                data.cost,
                data.quantity,
                data.total,
                Number(id)
            ]
        );

        if (result.affectedRows === 0) {
            throw new Error('Item not found');
        }
        return result;
    } catch (error) {
        console.error('SQL Error:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    fetchCategoryNames,
   
    saveToDatabase,
    fetchSupplierNames,
    fetchInventoryData,
    getStockReport,
    updateInventoryQuantity,
    deleteInventoryItemById,
    updateInventoryItem,
    fetchProductsByCategory
};