const GymClass = require("../models/ClassModel");

const ClassController = {
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

  fetchBookedClasses: async (req, res) => {
    try {
      // Extract user ID from the decoded token (done via middleware)
      const userId = req.user.id; // Assuming `req.user` contains the decoded token

      // Fetch booked classes based on the user ID
      const classes = await GymClass.getBookedClasses(userId);

      if (classes.length === 0) {
        return res.status(404).json({ message: "No booked classes found." });
      }

      res.json(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Fetch booked sessions for the user
  fetchBookedSessions: async (req, res) => {
    try {
      // Extract user ID from the decoded token (done via middleware)
      const userId = req.user.id; // Assuming `req.user` contains the decoded token

      // Fetch booked sessions based on the user ID
      const sessions = await GymClass.getBookedSessions(userId);

      if (sessions.length === 0) {
        return res.status(404).json({ message: "No booked sessions found." });
      }

      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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
