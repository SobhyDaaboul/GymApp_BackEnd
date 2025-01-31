const cors = require("cors");
const mysql = require("mysql");
const express = require("express");

const apiRoutes = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sobhy123$$",
  database: "gymapp",
});

// Connect to the database
db.connect((err) => {
  if (err) return console.error("Error connecting to the database:", err);

  console.log("Connected to the MySQL database.");
});

app.use("/api", apiRoutes);

app.get("/gymapp/class", (req, res) => {
  const query = "SELECT * FROM class"; // Make sure 'classes' is the correct table name

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log error in terminal
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
