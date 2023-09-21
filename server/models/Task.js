const pool = require("../db/db");

class TaskModel {
  async createTask(name, description, status, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert the task
      const taskInsertQuery = `
        INSERT INTO tasks (name, description, status, user_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id`;
      const taskValues = [name, description, status, user_id];
      const taskResult = await client.query(taskInsertQuery, taskValues);
      const taskId = taskResult.rows[0].id;

      // Insert associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO task_categories (task_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [taskId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: taskId, name, description, status, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getTasks(user_id) {
    try {
      const result = await pool.query(
        `SELECT t.*, c.id AS category_id, c.name AS category_name
         FROM tasks AS t
         LEFT JOIN task_categories AS tc ON t.id = tc.task_id
         LEFT JOIN categories AS c ON tc.category_id = c.id
         WHERE t.user_id = $1
         ORDER BY t.created_at DESC NULLS LAST`, // Add the ORDER BY clause here
        [user_id]
      );
  
      const tasks = [];
      const categorizedTasks = {};
  
      // Group tasks by ID to handle multiple categories
      for (const row of result.rows) {
        if (!categorizedTasks[row.id]) {
          categorizedTasks[row.id] = {
            id: row.id,
            name: row.name,
            description: row.description,
            status: row.status,
            user_id: row.user_id,
            categories: [],
            created_at: row.created_at, // Add the created_at field
          };
        }
  
        if (row.category_id !== null) {
          categorizedTasks[row.id].categories.push({
            id: row.category_id,
            name: row.category_name,
          });
        }
      }
  
      // Convert categorizedTasks object to an array
      const sortedTasks = Object.values(categorizedTasks).sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
  
      return sortedTasks;
    } catch (error) {
      throw error;
    }
  }
  
  
  

  async updateTask(id, name, description, status, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Update the task
      const taskUpdateQuery = `
        UPDATE tasks 
        SET name = $1, description = $2, status = $3 
        WHERE id = $4 AND user_id = $5 
        RETURNING id`;
      const taskValues = [name, description, status, id, user_id];
      const taskResult = await client.query(taskUpdateQuery, taskValues);

      if (taskResult.rowCount === 0) {
        throw new Error("Task not found or you don't have permission to update it.");
      }

      const taskId = taskResult.rows[0].id;

      // Delete existing associations in the junction table
      const deleteAssociationsQuery = `
        DELETE FROM task_categories 
        WHERE task_id = $1`;
      await client.query(deleteAssociationsQuery, [taskId]);

      // Insert new associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO task_categories (task_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [taskId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: taskId, name, description, status, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteTask(id, user_id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      // Remove task-category associations
      const removeAssociationsQuery = `
        DELETE FROM task_categories
        WHERE task_id = $1`;
      await client.query(removeAssociationsQuery, [id]);
  
      // Delete the task
      const result = await client.query(
        "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );
  
      if (result.rowCount === 0) {
        throw new Error("Task not found or you don't have permission to delete it.");
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

module.exports = new TaskModel();
