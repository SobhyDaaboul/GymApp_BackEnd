const classModel = require("../models/classModel");
const memberModel = require("../models/memberModel");
const classMemberModel = require("../models/classMemberModel");

exports.bookClass = async (req, res) => {
  try {
    return console.log("req.bod", req.body);
    const { classcode, memberId } = req.body;

    // Validate request body
    if (!classcode || !memberId) {
      return res
        .status(400)
        .json({ error: "classcode and memberId are required" });
    }

    // Check if the class exists
    classModel.getClassByCode(classcode, (err, classResults) => {
      if (err || classResults.length === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      // Check if the member exists
      memberModel.getMemberById(memberId, (err, memberResults) => {
        if (err || memberResults.length === 0) {
          return res.status(404).json({ error: "Member not found" });
        }

        // Book the class for the member
        classMemberModel.bookClassForMember(
          classcode,
          memberId,
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error booking class", details: err.message });
            }
            res.status(201).json({
              message: "Class booked successfully",
              bookingId: result.insertId,
            });
          }
        );
      });
    });
  } catch (error) {
    console.log("bookClass error", error);
  }
};
