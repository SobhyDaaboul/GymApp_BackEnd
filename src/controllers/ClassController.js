const Class = require("../models/ClassModel");
const Member = require("../models/Member");

const isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.memberId);

    if (!member || member.isLoggedIn !== 1) {
      return res.status(401).json({ message: "User not logged in" });
    }

    req.member = member; // Attaching member info to request for use in next middleware/controller
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

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
