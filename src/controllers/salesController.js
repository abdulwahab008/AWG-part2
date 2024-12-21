// src/controllers/salesController.js

const Sales = require('../models/salesModel');

exports.fetchCategoryNames = async (req, res) => {
    try {
        const categoryNames = await Sales.fetchCategoryNames();  
        res.json(categoryNames);
    } catch (error) {
        console.error('Error in fetchCategoryNames controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.fetchProductsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        if (!categoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        const products = await Sales.fetchProductsByCategory(categoryName); 
        res.json(products);
    } catch (error) {
        console.error('Error in fetchProductsByCategory controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.saveSalesToDatabase = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        await Sales.saveSalesToDatabase(data);
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.fetchSalesData = async (req, res) => {
    try {
        const SalesData = await Sales.fetchSalesData();
        res.json(SalesData);
    } catch (error) {
        console.error('Error fetching Sales data:', error);
        res.status(500).send('Internal Server Error');
    }
};





exports.deleteSalesItem = async (req, res) => {
    const id = req.params.id;
    
    if (!id || id === 'undefined') {
        return res.status(400).json({ error: 'Invalid ID provided' });
    }

    try {
        await Sales.deleteSalesItemById(id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateSalesItem = async (req, res) => {
    const id = req.params.id;
    const data = req.body[0];

    if (!id || id === 'undefined') {
        return res.status(400).json({ error: 'Invalid ID provided' });
    }

    try {
        console.log('Received update data:', data);

        if (!data.sku) {
            return res.status(400).json({ error: 'SKU cannot be null or empty' });
        }

        await Sales.updateSalesItem(id, data);
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            details: error.message 
        });
    }
};