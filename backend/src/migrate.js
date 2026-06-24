import pool from "./db.js";

const createTables = async () => {
  try {
    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS tasks (
    //     id SERIAL PRIMARY KEY,
    //     title VARCHAR(255) NOT NULL,
    //     done BOOLEAN DEFAULT false,
    //     created_at TIMESTAMP DEFAULT NOW()
    //   );
    // `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      ALTER TABLE users
      DROP COLUMN IF EXISTS username;
    `);
    console.log("Tables created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

createTables();
