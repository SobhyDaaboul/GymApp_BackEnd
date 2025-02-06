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
};

module.exports = ClassController;
