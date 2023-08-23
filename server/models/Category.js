const pool = require("../db/db");

class CategoryModel {
  async createCategory(name, user_id) {
    try {
      const result = await pool.query(
        "INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *",
        [name, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getCategories(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM categories WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id, name, user_id) {
    try {
      const result = await pool.query(
        "UPDATE categories SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
        [name, id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id, user_id) {
    try {
      const result = await pool.query(
        "DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new CategoryModel();
