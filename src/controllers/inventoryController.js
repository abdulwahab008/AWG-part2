const Inventory = require('../models/inventory');

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
        // Check if the quantity being sold is greater than the available quantity in inventory
        const inventoryData = await Inventory.fetchInventoryData();
        const inventoryItem = inventoryData.find(item => item.productName === saleData.productName);

        if (!inventoryItem || inventoryItem.quantity < saleData.quantity) {
            return res.status(400).send('Insufficient quantity in inventory for the sale');
        }

        // Update inventory quantity after the sale
        const updatedInventoryQuantity = inventoryItem.quantity - saleData.quantity;
        await Inventory.updateInventoryQuantity(saleData.productName, saleData.quantity);

        // Save sale data to the sales table
        await Sales.saveSalesToDatabase(saleData);


        res.status(200).send('Sale successful');
    } catch (error) {
        console.error('Error making sale:', error);
        res.status(500).send('Internal Server Error');
    }
};