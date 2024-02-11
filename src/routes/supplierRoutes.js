// Example routes in supplierRoutes.js

const express = require('express');
const supplierController = require('../controllers/supplierController');

const router = express.Router();

// Route to fetch all suppliers
router.get('/', supplierController.getAllSuppliers);

// Route to fetch existing data
router.get('/:id', supplierController.getSupplierById);

// Route to update a supplier
router.put('/:id', supplierController.updateSupplier);

// Route to delete a supplier
router.delete('/:id', supplierController.deleteSupplier);

// Route to handle POST requests at /suppliers
router.post('/', supplierController.addSupplier);

module.exports = router;
