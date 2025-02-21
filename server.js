require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes");
const path = require("path");

const app = express();

// Load environment variables
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api", apiRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Gym App Backend!");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
