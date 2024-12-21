const pool = require('./db');

async function fetchCategoryNames() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT DISTINCT categoryName FROM inventory WHERE categoryName IS NOT NULL ORDER BY categoryName');
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
            'SELECT productName, sku, price, cost FROM inventory WHERE categoryName = ? ORDER BY productName',
            [categoryName]
        );
        connection.release();
        
        return rows;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}

async function saveSalesToDatabase(data) {
    let connection;

    try {
        connection = await pool.getConnection();

        for (const row of data) {
            try {
                await connection.query(
                    'INSERT INTO sales (date, categoryName, productName, sku, quantity, price, cost,profit , total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [
                        row.date,
                        row.categoryName,
                        row.productName, 
                        row.sku,
                        row.quantity,
                        row.price,
                        row.cost,
                        row.profit,
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


async function fetchSalesData() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`
            SELECT 
                id,
                DATE_FORMAT(date, '%Y-%m-%d') as date,
                categoryName,
                productName,
                quantity,
                price,
                cost,
                profit,
                total
            FROM sales
            ORDER BY date DESC
        `);
        
    
        return rows.map(row => ({
            id: row.id,
            date: row.date,
            categoryName: row.categoryName,
            productName: row.productName,    
            quantity: row.quantity, 
            price: row.price,
            cost: row.cost,
            profit: row.profit,
            total: row.total
        }));
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        throw error;
    } finally {
        connection.release();
    }
}



async function deleteSalesItemById(id) {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid ID provided');
    }

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('DELETE FROM sales WHERE id = ?', [Number(id)]);
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
async function updateSalesItem(id, data) {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid ID provided');
    }


    if (!data.sku) {
        throw new Error('SKU cannot be null or empty');
    }

    const connection = await pool.getConnection();
    try {

        console.log('Updating sales with data:', data);

        const [result] = await connection.query(
            `UPDATE sales 
            SET date = ?,
                categoryName = ?,
                productName = ?,
                sku = ?,
                quantity = ?,
                price = ?,
                cost = ?,
                profit=?,
                total = ?
            WHERE id = ?`,
            [
                data.date,
                data.categoryName,
                data.productName,
                data.sku,
                data.quantity,
                data.price,
                data.cost,
                data.profit,
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
    fetchProductsByCategory,
    saveSalesToDatabase,
    fetchSalesData,
    deleteSalesItemById,
    updateSalesItem
};
