const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/MemberModel");
require("dotenv").config();

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Get member by email
      const member = await new Promise((resolve, reject) => {
        Member.getByEmail(email, (err, result) => {
          if (err) {
            return reject(new Error("Database error"));
          }
          if (!result) {
            return reject(new Error("Invalid email or password"));
          }
          resolve(result);
        });
      });

      // Ensure password is not undefined
      if (!member.password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, member.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Mark the user as logged in (optional, if you want to update `isLoggedIn` in the database)
      await Member.updateLoginStatus(email, 1); // Assuming you have this method in your model

      // Generate JWT token
      const token = jwt.sign(
        { memberId: member.member_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  }
}

module.exports = LoginController;
