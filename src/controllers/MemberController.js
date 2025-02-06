const Member = require("../models/MemberModel");

class MemberController {
  static async getMemberById(req, res) {
    try {
      const memberId = req.params.id; // Assuming the member ID is passed as a parameter

      Member.findById(memberId, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching member data", error: err });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Member not found" });
        }

        res.json({
          message: "Member data retrieved successfully",
          data: results[0],
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = MemberController;
