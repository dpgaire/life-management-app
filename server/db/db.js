const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // User as 'postgres'
  host: 'localhost',     // Assuming you're connecting to localhost
  database: 'lifemngdb',
  password:'admin@123', // Your database name
  port: 5432,            // Default PostgreSQL port
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Connection error', err.stack);
    return;
  }
  console.log('Connection established');

  // Release the client when done using it
  release();
});

module.exports = pool;
