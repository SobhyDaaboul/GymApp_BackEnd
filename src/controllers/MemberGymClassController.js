const Member = require("../models/MemberModel");
const MemberGymClass = require("../models/Member_gymclassModel"); // Ensure you import this model

class MemberGymClassController {
  async bookClass(req, res) {
    const { member_id } = req.params; // Get from URL
    const { classCode } = req.body;

    try {
      // 1. Verify member exists and is logged in
      const member = await Member.findById(member_id);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      if (member.isLoggedIn !== 1) {
        return res.status(403).json({ error: "Member not logged in" });
      }

      // 2. Check if class is already booked
      const existing = await MemberGymClass.findOne({
        where: { memberId: member_id, classCode },
      });
      if (existing) {
        return res.status(409).json({ error: "Already booked" });
      }

      // 3. Proceed with booking
      const newBooking = await MemberGymClass.create({
        memberId: member_id,
        classCode: classCode,
      });

      return res.json({ message: "Booking successful", result: newBooking });
    } catch (err) {
      console.error("Booking error:", err);
      return res.status(500).json({ error: "Class booking failed" });
    }
  }
}

module.exports = new MemberGymClassController();
