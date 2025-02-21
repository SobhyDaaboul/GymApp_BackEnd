const bcrypt = require("bcryptjs");
const Member = require("../models/MemberModel");

class SignupController {
  static async signup(req, res) {
    const { name, phoneNumber, email, password } = req.body;

    try {
      // ✅ Validate input
      if (!name || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // ✅ Check if the email already exists
      Member.findByEmail(email, async (err, results) => {
        if (err) {
          console.error("Error checking email:", err);
          return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        // ✅ Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create new member with hashed password
        const newMember = {
          name,
          phoneNumber,
          email,
          password: hashedPassword, // 🔒 Securely hashed password
          isLoggedIn: 0,
        };

        // ✅ Create member in the database
        Member.create(newMember, (err, results) => {
          if (err) {
            console.error("Error creating member:", err);
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
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = SignupController;
