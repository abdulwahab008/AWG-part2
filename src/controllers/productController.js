// src/controllers/productController.js

const Product = require('../models/product');
const { v4: uuidv4 } = require('uuid');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { categoryName, productName, description, price, cost } = req.body;

        if (!categoryName || !productName || !description || !price || !cost) {
            return res.status(400).json({ error: 'Please fill in all fields.' });
        }

        const sku = generateNumericUuid();

        const newProduct = await Product.createProduct({
            sku,
            category: categoryName,
            productName,
            description,
            price,
            cost,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const sku = req.params.sku;
        const { categoryName, productName, description, price, cost } = req.body;

        if (!categoryName || !productName || !description || !price || !cost) {
            return res.status(400).json({ error: 'Please fill in all fields.' });
        }

        const updatedProduct = await Product.updateProduct({
            sku,
            category: categoryName,
            productName,
            description,
            price,
            cost,
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const sku = req.params.sku;

        await Product.deleteProduct(sku);

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.getCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function generateNumericUuid() {
    // Generate a uuid
    const uuid = uuidv4();

    // Extract only numeric characters (0-9)
    const numericUuid = uuid.replace(/[^\d]/g, '');

    // Take the first 5 characters
    return numericUuid.substring(0, 5);
}
