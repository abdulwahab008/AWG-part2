// src/routes/salesRoutes.js

const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/categories', salesController.fetchCategoryNames);
router.get('/products/category/:categoryName', salesController.fetchProductsByCategory);
router.get('/fetchSalesData', salesController.fetchSalesData);
router.post('/saveSalesToDatabase', salesController.saveSalesToDatabase);
router.delete('/deleteSalesItem/:id', salesController.deleteSalesItem);
router.put('/updateSalesItem/:id', salesController.updateSalesItem);



module.exports = router;
