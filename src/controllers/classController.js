const GymClass = require("../models/ClassModel");

const ClassController = {
  // Get class code by name
  getClassCodeByName: (req, res) => {
    const { className } = req.params;

    GymClass.getByName(className, (err, classCode) => {
      if (err) {
        console.error("Error fetching class code:", err);
        return res
          .status(500)
          .json({ message: "Error fetching class code", error: err });
      }

      if (!classCode) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json({ classCode });
    });
  },

  // Get all classes
  getAllClasses: (req, res) => {
    GymClass.getAll((err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  },

  //ANDRO
  deleteClass(req, res) {
    try {
      const classCode = req.params.classCode; // Retrieve classCode from the URL params
      ClassModel.delete(classCode, (err, results) => {
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

  // ANDROID: Get specific class data
  getSpecificClassData(req, res) {
    ClassModel.getSpecificClassData((err, results) => {
      if (err) {
        console.error("Error fetching specific class data:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch specific class data" });
      }
      res.json(results);
    });
  },

  // ANDROID: Update class
  updateClass(req, res) {
    try {
      const { className, type, schedule, duration, price } = req.body;
      const classCode = req.params.classCode;
      if (!className || !type || !schedule || !duration || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
      ClassModel.updateClass(
        className,
        type,
        schedule,
        duration,
        price,
        classCode
      )
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

  //COMMENT
};

module.exports = ClassController;
