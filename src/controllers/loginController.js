const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/MemberModel");

const SECRET_KEY = "qwertyytrewqazxxzaq"; // Change this to a secure environment variable

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find member by email
      Member.findByEmail(email, async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const member = results[0];

        // 🔒 Compare hashed password
        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
          { id: member.member_id, email: member.email, name: member.name },
          SECRET_KEY,
          { expiresIn: "1h" } // Token expires in 1 hour
        );

        // ✅ Update login status
        Member.updateLoginStatus(member.member_id, 1, (updateErr) => {
          if (updateErr) {
            return res.status(500).json({
              message: "Error updating login status",
              error: updateErr,
            });
          }

          // 🔹 Send token instead of just a success message
          res.json({ message: "Login successful", token });
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = LoginController;
