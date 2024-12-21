// routes/inventoryRoutes.js

const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();
router.get('/categories', inventoryController.fetchCategoryNames);
router.post('/saveToDatabase', inventoryController.saveToDatabase);
router.get('/products/category/:categoryName', inventoryController.fetchProductsByCategory);
router.get('/fetchSupplierNames', inventoryController.fetchSupplierNames);
router.get('/fetchInventoryData', inventoryController.fetchInventoryData);
router.post('/makeSale', inventoryController.makeSale);
router.delete('/deleteInventoryItem/:id', inventoryController.deleteInventoryItem);
router.put('/updateInventory/:id', inventoryController.updateInventoryItem);


module.exports = router;
