const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
