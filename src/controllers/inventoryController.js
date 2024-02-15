const Inventory = require('../models/inventory');
const sales=require('../models/salesModel');

exports.saveToDatabase = async (req, res) => {
    const data = req.body;

    try {
        await Inventory.saveToDatabase(data);
        res.status(200).send('Data saved to database');
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.fetchProductNames = async (req, res) => {
    try {
        const productNames = await Inventory.fetchProductNames();
        res.json(productNames);
    } catch (error) {
        console.error('Error fetching product names:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.fetchSupplierNames = async (req, res) => {
    try {
        const supplierNames = await Inventory.fetchSupplierNames();
        res.json(supplierNames);
    } catch (error) {
        console.error('Error fetching supplier names:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.fetchInventoryData = async (req, res) => {
    try {
        const inventoryData = await Inventory.fetchInventoryData();
        res.json(inventoryData);
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.makeSale = async (req, res) => {
    const saleData = req.body;

    try {
        // Fetch the current inventory quantity for the product being sold
        const inventoryData = await Inventory.fetchInventoryData();
        const inventoryItem = inventoryData.find(item => item.productName === saleData.productName);

        if (!inventoryItem) {
            console.log('Product not found in inventory:', saleData.productName);
            return res.status(400).send('Product not found in inventory');
        }

        const availableQuantity = inventoryItem.quantity;

        // Check if the quantity being sold is greater than the available quantity in inventory
        if (saleData.quantity > availableQuantity) {
            console.log('Insufficient quantity in inventory for the sale');
            return res.status(400).send('Insufficient quantity in inventory for the sale');
        }

        // Log the sale data before the sale
        console.log('Sale data before update:', saleData);

        // Update inventory quantity after the sale
        await Inventory.updateInventoryQuantity(saleData.productName, saleData.quantity);

        // Save sale data to the sales table
        await Sales.saveToDatabase(saleData); // Use the correct function based on your implementation

        // Log the sale data after the update
        console.log('Sale data after update:', saleData);

        console.log('Sale successful');
        res.status(200).send('Sale successful');
    } catch (error) {
        console.error('Error making sale:', error);
        res.status(500).send('Internal Server Error');
    }
};