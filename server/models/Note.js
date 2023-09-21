const pool = require("../db/db");

class NoteModel {
  async createNote(title, content, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert the note
      const noteInsertQuery = `
        INSERT INTO notes (title, content, user_id) 
        VALUES ($1, $2, $3) 
        RETURNING id`;
      const noteValues = [title, content, user_id];
      const noteResult = await client.query(noteInsertQuery, noteValues);
      const noteId = noteResult.rows[0].id;

      // Insert associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO note_categories (note_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [noteId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: noteId, title, content, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getNotes(user_id) {
    try {
      const result = await pool.query(
        `SELECT n.*, c.id AS category_id, c.name AS category_name
         FROM notes AS n
         LEFT JOIN note_categories AS nc ON n.id = nc.note_id
         LEFT JOIN categories AS c ON nc.category_id = c.id
         WHERE n.user_id = $1
         ORDER BY n.created_at DESC NULLS LAST`, // Added ORDER BY clause
        [user_id]
      );
  
      const categorizedNotes = {};
  
      // Group notes by ID to handle multiple categories
      for (const row of result.rows) {
        if (!categorizedNotes[row.id]) {
          categorizedNotes[row.id] = {
            id: row.id,
            title: row.title,
            content: row.content,
            user_id: row.user_id,
            categories: [],
            created_at: row.created_at, // Include the created_at in the result
          };
        }
  
        if (row.category_id !== null) {
          categorizedNotes[row.id].categories.push({
            id: row.category_id,
            name: row.category_name,
          });
        }
      }
  
      // Convert categorizedNotes object to an array and sort by created_at
      const sortedNotes = Object.values(categorizedNotes).sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
  
      return sortedNotes;
    } catch (error) {
      throw error;
    }
  }
  
  

  async updateNote(id, title, content, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Update the note
      const noteUpdateQuery = `
        UPDATE notes 
        SET title = $1, content = $2 
        WHERE id = $3 AND user_id = $4 
        RETURNING id`;
      const noteValues = [title, content, id, user_id];
      const noteResult = await client.query(noteUpdateQuery, noteValues);

      if (noteResult.rowCount === 0) {
        throw new Error("Note not found or you don't have permission to update it.");
      }

      const noteId = noteResult.rows[0].id;

      // Delete existing associations in the junction table
      const deleteAssociationsQuery = `
        DELETE FROM note_categories 
        WHERE note_id = $1`;
      await client.query(deleteAssociationsQuery, [noteId]);

      // Insert new associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO note_categories (note_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [noteId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: noteId, title, content, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteNote(id, user_id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Remove note-category associations
      const removeAssociationsQuery = `
        DELETE FROM note_categories
        WHERE note_id = $1`;
      await client.query(removeAssociationsQuery, [id]);

      // Delete the note
      const result = await client.query(
        "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );

      if (result.rowCount === 0) {
        throw new Error("Note not found or you don't have permission to delete it.");
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new NoteModel();
