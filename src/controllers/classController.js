const Class = require("../models/ClassModel");
const Member = require("../models/MemberModel");

const ClassController = {
  createClass: [
    isLoggedIn,
    (req, res) => {
      const classData = req.body;
      Class.create(classData, (err, result) => {
        if (err) return res.status(500).json(err);
        res
          .status(201)
          .json({ message: "Class created successfully", id: result.insertId });
      });
    },
  ],

  getAllClasses: [
    isLoggedIn,
    (req, res) => {
      Class.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
      });
    },
  ],
};

module.exports = ClassController;
