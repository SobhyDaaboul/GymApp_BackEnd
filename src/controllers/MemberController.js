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

  //ANDROID
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
      res.status(500).json({ message: "Server error" });
    }
  }

  //ANDROID
  static async getMembers(req, res) {
    try {
      Member.findMembers((err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching members", error: err });
        }
        // Ensuring results is returned as an array
        if (!Array.isArray(results)) {
          return res
            .status(500)
            .json({ message: "Expected array response from database" });
        }
        res.json({ message: "Members retrieved successfully", data: results });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  //ANDROID
  static async updateMember(req, res) {
    try {
      const { name, email, password, phoneNumber } = req.body;
      const memberId = req.params.id; // Get memberId from URL
      if (!name || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const result = await Member.updateMember(
        name,
        email,
        password,
        phoneNumber,
        memberId
      );
      return res
        .status(200)
        .json({ message: "Member updated successfully", result });
    } catch (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
  }
}

module.exports = MemberController;
