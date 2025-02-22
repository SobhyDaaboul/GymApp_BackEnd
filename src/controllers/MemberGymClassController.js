const MemberGymClass = require("../models/Member_gymclassModel");
const Class = require("../models/ClassModel");

class MemberGymClassController {
  static async bookClass(req, res) {
    try {
      console.log("Request user:", req.user); // Debug JWT payload
      const { className } = req.body;
      const memberId = req.user.member_id;

      console.log("Booking request:", { memberId, className });

      // Get class ID
      const classRecord = await Class.getByName(className);
      console.log("Class lookup result:", classRecord);

      if (!classRecord) {
        console.error("Class not found:", className);
        return res.status(404).json({ error: "Class not found" });
      }

      // Check existing booking
      const existingBooking = await MemberGymClass.findExistingBooking(
        memberId,
        classRecord.classCode
      );
      console.log("Existing booking check:", existingBooking);

      if (existingBooking) {
        return res.status(409).json({ error: "Class already booked" });
      }

      // Create booking
      const result = await MemberGymClass.createBooking(
        memberId,
        classRecord.classCode
      );
      console.log("Booking result:", result);

      res.status(200).json({ message: "Booking successful" });
    } catch (error) {
      console.error("Booking error details:", {
        message: error.message,
        stack: error.stack,
        sqlMessage: error.sqlMessage,
      });
      res.status(500).json({
        error: "Internal server error",
        details: error.message, // Send actual error to frontend
      });
    }
  }

  /*
    if (!req.user || !req.user.memberId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: User must be logged in." });
    }

    const memberId = req.user.memberId;

    if (!classCode) {
      return res
        .status(400)
        .json({ message: "Missing required field: classCode" });
    }

    MemberGymClass.bookClass(memberId, classCode, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error booking class", error: err });
      }
      res
        .status(201)
        .json({ message: "Class booked successfully", data: result });
    });
  }*/
}

module.exports = MemberGymClassController;
