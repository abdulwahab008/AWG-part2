const db = require('./db');

async function createProduct({ sku, category, productName, description, price, cost }) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO products (sku, categoryName, productName, description, price, cost) VALUES (?, ?, ?, ?, ?, ?)',
            [sku, category, productName, description, price, cost]
        );

        await connection.commit();

        return {
            id: result.insertId,
            sku,
            category,
            productName,
            description,
            price,
            cost
        };
    } catch (error) {
        console.error('Error creating product:', error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getAllProducts() {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        return rows;
    } finally {
        connection.release();
    }
}

async function updateProduct({ sku, category, productName, description, price, cost }) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'UPDATE products SET categoryName=?, productName=?, description=?, price=?, cost=? WHERE sku=?',
            [category, productName, description, price, cost, sku]
        );

        await connection.commit();

        return {
            sku,
            category,
            productName,
            description,
            price,
            cost
        };
    } catch (error) {
        console.error('Error updating product:', error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function deleteProduct(sku) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute('DELETE FROM products WHERE sku=?', [sku]);

        await connection.commit();
    } catch (error) {
        console.error('Error deleting product:', error);
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getCategories() {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.execute('SELECT name FROM categories');
        return rows;
    } finally {
        connection.release();
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getCategories,
};
