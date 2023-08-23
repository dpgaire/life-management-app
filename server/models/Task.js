const pool = require("../db/db");

class TaskModel {
  async createTask(title, completed, userId) {
    try {
      const result = await pool.query(
        "INSERT INTO tasks (title, completed, user_id) VALUES ($1, $2, $3) RETURNING *",
        [title, completed, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1',
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

 
  async updateTask(id, title, completed,user_id) {
    try {
      const result = await pool.query(
        "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
        [title, completed, id,user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id,user_id) {
    try {
      const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
        [id,user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TaskModel();
