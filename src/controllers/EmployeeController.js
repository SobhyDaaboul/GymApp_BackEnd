const Employee = require("../models/EmployeeModel");

const EmployeeController = {
  getAllEmployees: (req, res) => {
    Employee.getAll((err, results) => {
      if (err) {
        console.error("Error in getAllEmployees:", err);
        return res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });
      }
      res.json(results);
    });
  },

  getEmployeeById: (req, res) => {
    const id = req.params.id;
    Employee.getById(id, (err, results) => {
      if (err) {
        console.error("Error fetching employee:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(results[0]);
    });
  },

  getSpecificData: (err, results) => {
    if (err) {
      console.error("Error fetching specific employee data:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch specific employee data" });
    }
    res.json(results);
  },
};

module.exports = EmployeeController;
