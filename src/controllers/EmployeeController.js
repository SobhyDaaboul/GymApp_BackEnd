const Employee = require("../models/EmployeeModel");

const EmployeeController = {
  getAllEmployees: (req, res) => {
    Employee.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  getEmployeeById: (req, res) => {
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
