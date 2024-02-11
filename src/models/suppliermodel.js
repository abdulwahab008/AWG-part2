// src/models/suppliermodel.js

const db = require('./db');

async function addSupplier(supplierName, supplierAddress, contactNumber) {
    const query = 'INSERT INTO suppliers (supplier_name, supplier_address, contact_number) VALUES (?, ?, ?)';
    const values = [supplierName, supplierAddress, contactNumber];

    try {
        const [result] = await db.query(query, values);
        return { id: result.insertId, supplierName, supplierAddress, contactNumber };
    } catch (error) {
        console.error('Error adding supplier:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}


async function getSupplierById(supplierId) {
    const query = 'SELECT * FROM suppliers WHERE id = ?';
    const [result] = await db.query(query, [supplierId]);

    return result[0] || null;
}
async function find() {
    try {
        const query = 'SELECT * FROM suppliers';
        console.log('SQL Query:', query);

        const [result] = await db.query(query);
        return result;
    } catch (error) {
        console.error('Error executing SQL query (find):', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}

async function updateSupplier(supplierId, supplierName, supplierAddress, contactNumber) {
    const query = 'UPDATE suppliers SET supplier_name = ?, supplier_address = ?, contact_number = ? WHERE id = ?';
    const values = [supplierName, supplierAddress, contactNumber, supplierId];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
        return null; // No rows were updated, supplier not found
    }

    return { id: supplierId, supplierName, supplierAddress, contactNumber };
}

async function deleteSupplier(supplierId) {
    const query = 'DELETE FROM suppliers WHERE id = ?';
    const [result] = await db.query(query, [supplierId]);

    if (result.affectedRows === 0) {
        return null; // No rows were deleted, supplier not found
    }

    return { id: supplierId };
}

module.exports = {
    addSupplier,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    find, // Add the find method to the exports
};