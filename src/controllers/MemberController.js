const Member = require("../models/MemberModel");

class MemberController {
  static async getAllMembers(req, res) {
    try {
      Member.findAll((err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching members", error: err });
        }
        res.json({ message: "Members retrieved successfully", data: results });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async getMemberById(req, res) {
    try {
      const memberId = req.params.id;
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
          message: "Member retrieved successfully",
          data: results[0],
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async getMemberByEmail(req, res) {
    try {
      const email = req.params.email;
      Member.findByEmail(email, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching member", error: err });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Member not found" });
        }
        res.json({
          message: "Member retrieved successfully",
          data: results[0],
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async deleteMember(req, res) {
    try {
      const memberId = req.params.id;
      Member.delete(memberId, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error deleting member", error: err });
        }
        res.json({ message: "Member deleted successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = MemberController;
