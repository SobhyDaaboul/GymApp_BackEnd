const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "Sobhy",
  password: "Sobhy123$$",
  database: "gymapp",
});

// Connect to the database
db.connect((err) => {
  if (err) return console.error("Error connecting to the database:", err);
  console.log("Connected to the MySQL database.");
});

module.exports = db;
