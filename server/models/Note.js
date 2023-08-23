const pool = require("../db/db");

class NoteModel {
  async createNote(title, content, user_id) {
    try {
      const result = await pool.query(
        "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
        [title, content, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getNotes(user_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM notes WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id, title, content, user_id) {
    try {
      const result = await pool.query(
        "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
        [title, content, id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(id, user_id) {
    try {
      const result = await pool.query(
        "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NoteModel();
