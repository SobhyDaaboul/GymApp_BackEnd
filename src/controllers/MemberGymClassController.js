const MemberGymClass = require("../models/Member_gymclassModel");

const MemberGymClassController = {
  createBooking: (req, res) => {
    const { classCode } = req.body;
    const memberId = req.user.member_id; // Extract `memberId` from token (middleware needed)

    if (!memberId || !classCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if booking already exists
    MemberGymClass.findExistingBooking(
      memberId,
      classCode,
      (err, existingBooking) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (existingBooking) {
          return res
            .status(400)
            .json({ message: "You have already booked this class" });
        }

        // If no existing booking, proceed to create one
        MemberGymClass.createBooking(memberId, classCode, (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error creating booking" });
          }
          res
            .status(201)
            .json({ message: "Booking created successfully", result });
        });
      }
    );
  },

  //for PT_session
  createSession: (req, res) => {
    const { sessionCode } = req.body;
    const { selectedDay } = req.body;
    const memberId = req.user.member_id;

    console.log("Received request:", sessionCode, selectedDay);
    // Extract `memberId` from token (middleware needed)

    if (!memberId || !sessionCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if booking already exists
    MemberGymClass.findExistingSession(
      memberId,
      sessionCode,
      (err, existingBooking) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (existingBooking) {
          return res
            .status(400)
            .json({ message: "You have already booked this Session" });
        }

        // If no existing booking, proceed to create one
        MemberGymClass.createSession(
          memberId,
          sessionCode,
          selectedDay,
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error creating booking" });
            }
            res
              .status(201)
              .json({ message: "Booking created successfully", result });
          }
        );
      }
    );
  },
};

module.exports = MemberGymClassController;
