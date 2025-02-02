const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
require("dotenv").config();

class LoginController {
  static async login(req, res) {
    const { email, password } = req.body;

    Member.findByEmail(email, async (err, member) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (!member)
        return res.status(400).json({ message: "Invalid email or password" });

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, member.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });

      // Generate JWT token
      const token = jwt.sign({ memberId: member.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    });
  }
}

module.exports = LoginController;
