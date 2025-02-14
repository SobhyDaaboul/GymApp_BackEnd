const GymClass = require("../models/ClassModel");

const ClassController = {
  createClass: (req, res) => {
    const classData = req.body;
    Class.create(classData, (err, result) => {
      if (err) return res.status(500).json(err);
      res
        .status(201)
        .json({ message: "Class created successfully", id: result.insertId });
    });
  },

  getAllClasses: (req, res) => {
    Class.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  deleteClass(req, res) {
    try {
      const classCode = req.params.classCode; // Retrieve classCode from the URL params
      Class.delete(classCode, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error deleting class", error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Class not found" });
        }
        res.json({ message: "Class deleted successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getSpecificClassData: (req, res) => {
    Class.getSpecificClassData((err, results) => {
      if (err) {
        console.error("Error fetching specific class data:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch specific class data" });
      }
      res.json(results);
    });
  },
};

module.exports = ClassController;
