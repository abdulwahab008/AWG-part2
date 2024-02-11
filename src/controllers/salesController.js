// src/controllers/salesController.js

const Sales = require('../models/salesModel');

exports.fetchCategoryNames = async (req, res) => {
    try {
        const categoryNames = await Sales.fetchCategoryNames();
        res.json(categoryNames);
    } catch (error) {
        console.error('Error fetching category names:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.fetchProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.query.categoryName;
        const products = await Sales.fetchProductsByCategory(categoryName);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.saveSalesToDatabase = async (req, res) => {
    console.log('Received a request to save sales data.'); // Add this line
    const data = req.body;

    try {
        await Sales.saveSalesToDatabase(data);
        res.status(200).send('Data saved to the database');
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.fetchSalesData = async (req, res) => {
    try {
        const salesData = await Sales.fetchSalesData();
        res.json(salesData);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteSalesData = async (req, res) => {
    const { date, categoryName, productName } = req.body;

    try {
        await Sales.deleteSalesData(date, categoryName, productName);
        res.status(200).send('Data deleted successfully');
    } catch (error) {
        console.error('Error deleting sales data:', error);
        res.status(500).send('Internal Server Error');
    }
};