// ./src/controllers/categoryController.js
const Category = require('../models/Category');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const categoryId = await Category.createCategory(name);
    res.status(201).json({ message: 'Category added successfully', categoryId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    const updatedCategoryId = await Category.updateCategory(categoryId, name);
    res.json({ message: 'Category updated successfully', updatedCategoryId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    await Category.deleteCategory(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
