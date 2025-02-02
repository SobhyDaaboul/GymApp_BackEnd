const bcrypt = require("bcryptjs");
const Member = require("../models/Member");

class SignupController {
  static async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      Member.findByEmail(email, async (err, existingMember) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (existingMember)
          return res.status(400).json({ message: "Email already in use" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store member
        Member.createMember(name, email, hashedPassword, (err, memberId) => {
          if (err) return res.status(500).json({ message: "Server error" });

          res
            .status(201)
            .json({ message: "Member registered successfully", memberId });
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = SignupController;
