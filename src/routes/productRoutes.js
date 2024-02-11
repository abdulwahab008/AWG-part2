// Example in your productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/categories', productController.getCategories);
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:sku', productController.updateProduct); // Add this line for updating a product
router.delete('/:sku', productController.deleteProduct); // Add this line for deleting a product

module.exports = router;
