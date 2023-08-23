const pool = require("../db/db");

class ExpenseModel {
  async createExpense(item, amount,userId) {
    try {
      const result = await pool.query(
        "INSERT INTO expenses (item, amount,user_id) VALUES ($1, $2, $3) RETURNING *",
        [item, amount,userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getExpenses(userId) {
    try {
      const result = await pool.query("SELECT * FROM expenses WHERE user_id = $1",[userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async updateExpense(id, item, amount,userId) {
    try {
      const result = await pool.query(
        "UPDATE expenses SET item = $1, amount = $2 WHERE id = $3  AND user_id = $4 RETURNING *",
        [item, amount, id,userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteExpense(id,userId) {
    try {
      const result = await pool.query(
        "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
        [id,userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ExpenseModel();
