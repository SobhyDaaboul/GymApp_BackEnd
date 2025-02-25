const Employee = require("../models/EmployeeModel");

const EmployeeController = {
  getAllEmployees: (req, res) => {
    Employee.getAll((err, results) => {
      if (err)
        return res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });

      res.json(results);
    });
  },

  getEmployeeById: (req, res) => {
    const id = req.params.id;
    Employee.getById(id, (err, results) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });

      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(results[0]);
    });
  },

  //ANDROID
  deleteEmployee(req, res) {
    try {
      const idemployee = req.params.idemployee;
      Employee.delete(idemployee, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error deleting Trainer", error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Trainer not found" });
        }
        res.json({ message: "Trainer deleted successfully" });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  //ANDROID
  getSpecificData: (err, results) => {
    if (err) {
      console.error("Error fetching specific employee data:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch specific employee data" });
    }
    res.json(results);
  },

  //ANDROID
  updateEmployee(req, res) {
    try {
      const { name, phoneNumber, rate, schedule } = req.body;
      const idemployee = req.params.idemployee;
      if (!name || !phoneNumber || !rate || !schedule) {
        return res.status(400).json({ message: "All fields are required" });
      }
      Employee.updateEmployee(name, phoneNumber, rate, schedule, idemployee)
        .then((result) => {
          return res
            .status(200)
            .json({ message: "Employee updated successfully", result });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
  },
};

module.exports = EmployeeController;
