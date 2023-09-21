const pool = require("../db/db");

class ExpenseModel {
  async createExpense(item, price, quantity, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insert the expense
      const expenseInsertQuery = `
        INSERT INTO expenses (item, price, quantity, user_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id`;
      const expenseValues = [item, price, quantity, user_id];
      const expenseResult = await client.query(expenseInsertQuery, expenseValues);
      const expenseId = expenseResult.rows[0].id;

      // Insert associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO expense_categories (expense_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [expenseId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: expenseId, item, price, quantity, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getExpenses(user_id) {
    try {
      const result = await pool.query(
        `SELECT e.*, c.id AS category_id, c.name AS category_name
         FROM expenses AS e
         LEFT JOIN expense_categories AS ec ON e.id = ec.expense_id
         LEFT JOIN categories AS c ON ec.category_id = c.id
         WHERE e.user_id = $1
         ORDER BY e.created_at DESC NULLS LAST`, // Added ORDER BY clause
        [user_id]
      );
  
      const expenses = [];
      const categorizedExpenses = {};
  
      // Group expenses by ID to handle multiple categories
      for (const row of result.rows) {
        if (!categorizedExpenses[row.id]) {
          categorizedExpenses[row.id] = {
            id: row.id,
            item: row.item,
            price: row.price,
            quantity: row.quantity,
            user_id: row.user_id,
            categories: [],
            created_at: row.created_at, // Include the created_at in the result
          };
        }
  
        if (row.category_id !== null) {
          categorizedExpenses[row.id].categories.push({
            id: row.category_id,
            name: row.category_name,
          });
        }
      }
  
      // Convert categorizedExpenses object to an array and sort by created_at
      const sortedExpenses = Object.values(categorizedExpenses).sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
  
      return sortedExpenses;
    } catch (error) {
      throw error;
    }
  }
  

  async updateExpense(id, item, price, quantity, user_id, category_ids) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Update the expense
      const expenseUpdateQuery = `
        UPDATE expenses 
        SET item = $1, price = $2, quantity = $3 
        WHERE id = $4 AND user_id = $5 
        RETURNING id`;
      const expenseValues = [item, price, quantity, id, user_id];
      const expenseResult = await client.query(expenseUpdateQuery, expenseValues);

      if (expenseResult.rowCount === 0) {
        throw new Error("Expense not found or you don't have permission to update it.");
      }

      const expenseId = expenseResult.rows[0].id;

      // Delete existing associations in the junction table
      const deleteAssociationsQuery = `
        DELETE FROM expense_categories 
        WHERE expense_id = $1`;
      await client.query(deleteAssociationsQuery, [expenseId]);

      // Insert new associations with categories into the junction table
      for (const category_id of category_ids) {
        const categoryInsertQuery = `
          INSERT INTO expense_categories (expense_id, category_id) 
          VALUES ($1, $2)`;
        const categoryValues = [expenseId, category_id];
        await client.query(categoryInsertQuery, categoryValues);
      }

      await client.query("COMMIT");
      return { id: expenseId, item, price, quantity, user_id, category_ids };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteExpense(id, user_id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Remove expense-category associations
      const removeAssociationsQuery = `
        DELETE FROM expense_categories
        WHERE expense_id = $1`;
      await client.query(removeAssociationsQuery, [id]);

      // Delete the expense
      const result = await client.query(
        "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );

      if (result.rowCount === 0) {
        throw new Error("Expense not found or you don't have permission to delete it.");
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

module.exports = new ExpenseModel();
