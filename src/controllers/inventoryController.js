const Inventory = require('../models/inventory');
// const sales = require('../models/salesModel');

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

exports.fetchCategoryNames = async (req, res) => {
    try {
        const categoryNames = await Inventory.fetchCategoryNames();  // Changed to use Inventory model
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
        const products = await Inventory.fetchProductsByCategory(categoryName);  // Changed to use Inventory model
        res.json(products);
    } catch (error) {
        console.error('Error in fetchProductsByCategory controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        const inventoryData = await Inventory.fetchInventoryData();
        const inventoryItem = inventoryData.find(item => item.productName === saleData.productName);

        if (!inventoryItem) {
            console.log('Product not found in inventory:', saleData.productName);
            return res.status(400).send('Product not found in inventory');
        }

        const availableQuantity = inventoryItem.quantity;
        
        if (saleData.quantity > availableQuantity) {
            console.log('Insufficient quantity in inventory for the sale');
            return res.status(400).send('Insufficient quantity in inventory for the sale');
        }

        console.log('Sale data before update:', saleData);
        await Inventory.updateInventoryQuantity(saleData.productName, saleData.quantity);
        await sales.saveToDatabase(saleData);  // Changed to lowercase 'sales'
        console.log('Sale data after update:', saleData);
        console.log('Sale successful');
        res.status(200).send('Sale successful');
    } catch (error) {
        console.error('Error making sale:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteInventoryItem = async (req, res) => {
    const id = req.params.id;
    
    if (!id || id === 'undefined') {
        return res.status(400).json({ error: 'Invalid ID provided' });
    }

    try {
        await Inventory.deleteInventoryItemById(id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateInventoryItem = async (req, res) => {
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

        await Inventory.updateInventoryItem(id, data);
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            details: error.message 
        });
    }
};