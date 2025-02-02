const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
