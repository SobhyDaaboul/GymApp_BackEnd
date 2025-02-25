const mysql = require("mysql2");
require("dotenv").config();

// Load sensitive credentials from environment variables
const SECRET_KEY = process.env.SECRET_KEY;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "Sobhy";
const DB_PASSWORD = process.env.DB_PASSWORD || "Sobhy123$$";
const DB_NAME = process.env.DB_NAME || "gymapp";

// Create a MySQL database connection
const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
db.connect((err) => {
  if (err)
    return console.error("❌ Error connecting to the database:", err.message);
});

module.exports = db;
