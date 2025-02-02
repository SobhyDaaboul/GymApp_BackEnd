const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
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

      const member = await Member.findByEmail(email);
      if (!member) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, member.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ memberId: member.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = LoginController;
