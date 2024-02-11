// ./src/models/Category.js (MySQL version)
const db = require('../models/db');  // Correct


class Category {
  static async getAllCategories() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  static async createCategory(name) {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    return result.insertId;
  }

  static async updateCategory(categoryId, name) {
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId]);
    return categoryId;
  }

  static async deleteCategory(categoryId) {
    await db.query('DELETE FROM categories WHERE id = ?', [categoryId]);
  }
}

module.exports = Category;
