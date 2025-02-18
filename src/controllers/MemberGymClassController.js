// controllers/memberGymClassController.js

const MemberGymClassModel = require("../models/Member_gymclassModel");

const MemberGymClassController = {
  // Function to book class
  bookClass: (req, res) => {
    const { memberId, classCode } = req.body;

    if (!memberId || !classCode) {
      return res
        .status(400)
        .json({ error: "Member ID and Class Code are required" });
    }

    // Call the model function to add the member to the gym class
    MemberGymClassModel.addMemberToGymClass(
      memberId,
      classCode,
      (err, result) => {
        if (err) {
          console.error("Error booking class:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        // Send success response
        res.status(200).json({ message: "Class successfully booked", result });
      }
    );
  },
};

module.exports = MemberGymClassController;
