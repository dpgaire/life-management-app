// models/User.js
const pool = require("../db/db");
const bcrypt = require("bcrypt"); // Import bcrypt library

async function loginUser(email, password) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    const user = result.rows[0]; // Get user data from the query result

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return { email: user.email, user: user };
      } else {
        return null;
      }
    } else {
      // User not found
      return null;
    }
  } catch (error) {
    throw error;
  }
}


const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0]; 
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  createUser,
  findUserByEmail
};
