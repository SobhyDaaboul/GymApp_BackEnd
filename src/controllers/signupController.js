const bcrypt = require("bcryptjs");
const Member = require("../models/Member");

class SignupController {
  static async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      // Input validation (example)
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingMember = await Member.findByEmail(email);
      if (existingMember) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Store member
      const memberId = await Member.createMember(name, email, hashedPassword);

      // Mark the user as logged in (optional, if you want to update `isLoggedIn` in the database immediately)
      await Member.updateLoginStatus(email, 1); // Update isLoggedIn to 1 after sign-up

      res
        .status(201)
        .json({ message: "Member registered successfully", memberId });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = SignupController;
