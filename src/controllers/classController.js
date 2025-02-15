const Class = require("../models/ClassModel");

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

  //ANDROID
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

  //ANDROID
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

  //ANDROID
  updateClass(req, res) {
    try {
      const { className, type, schedule, duration, price } = req.body;
      const classCode = req.params.classCode;
      if (!className || !type || !schedule || !duration || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
      Class.updateClass(className, type, schedule, duration, price, classCode)
        .then((result) => {
          return res
            .status(200)
            .json({ message: "Class updated successfully", result });
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

module.exports = ClassController;
