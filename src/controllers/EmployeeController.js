const Employee = require("../models/EmployeeModel");
const isLoggedIn = require("../controllers/isLoggedIn");

const EmployeeController = {
  getAllEmployees: (req, res) => {
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

    Employee.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  getEmployeeById: (req, res) => {
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

    const id = req.params.id;
    Employee.getById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Employee not found" });
      res.json(results[0]);
    });
  },
};

module.exports = EmployeeController;
