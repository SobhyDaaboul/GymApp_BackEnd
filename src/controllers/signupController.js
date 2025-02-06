const Member = require("../models/MemberModel");

class SignupController {
  static async signup(req, res) {
    try {
      const { name, phoneNumber, email, password } = req.body;

      // Input validation
      if (!name || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the email already exists
      Member.findByEmail(email, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        // Create new member
        const newMember = {
          name,
          phoneNumber,
          email,
          password, // Password as plain text (you might want to hash this)
          isLoggedIn: 0,
        };

        Member.create(newMember, (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error creating member", error: err });
          }

          res.status(201).json({
            message: "Member created successfully",
            memberId: results.insertId,
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = SignupController;
