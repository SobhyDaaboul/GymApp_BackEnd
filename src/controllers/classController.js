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
