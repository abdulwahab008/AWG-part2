// src/controllers/supplierController.js

const supplierModel = require('../models/suppliermodel');

async function addSupplier(req, res) {
    const { supplierName, supplierAddress, contactNumber } = req.body;

    if (!supplierName || !supplierAddress || !contactNumber) {
        return res.status(400).json({ success: false, error: 'Invalid input' });
    }

    try {
        const result = await supplierModel.addSupplier(supplierName, supplierAddress, contactNumber);

        if (!result) {
            return res.status(500).json({ success: false, error: 'Failed to add supplier' });
        }

        res.json({ success: true, message: 'Supplier added successfully', data: result });
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    console.log('Received Contact Number:', contactNumber);

}


async function getAllSuppliers(req, res) {
    try {
        const suppliers = await supplierModel.find(); // Update this based on your database library
        res.json({ success: true, data: suppliers });
    } catch (error) {
        console.error('Error fetching all suppliers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function getSupplierById(req, res) {
    const supplierId = req.params.id;

    try {
        const supplier = await supplierModel.getSupplierById(supplierId);

        if (!supplier) {
            return res.status(404).json({ success: false, error: 'Supplier not found' });
        }

        res.json({ success: true, data: supplier });
    } catch (error) {
        console.error('Error fetching supplier by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function updateSupplier(req, res) {
    const supplierId = req.params.id;
    const { supplierName, supplierAddress, contactNumber } = req.body;

    if (!supplierName || !supplierAddress || !contactNumber) {
        return res.status(400).json({ success: false, error: 'Invalid input' });
    }

    try {
        const updatedSupplier = await supplierModel.updateSupplier(supplierId, supplierName, supplierAddress, contactNumber);

        if (!updatedSupplier) {
            return res.status(404).json({ success: false, error: 'Supplier not found' });
        }

        res.json({ success: true, message: 'Supplier updated successfully', data: updatedSupplier });
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

async function deleteSupplier(req, res) {
    const supplierId = req.params.id;

    try {
        const deletedSupplier = await supplierModel.deleteSupplier(supplierId);

        if (!deletedSupplier) {
            return res.status(404).json({ success: false, error: 'Supplier not found' });
        }

        res.json({ success: true, message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllSuppliers,
    addSupplier,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
