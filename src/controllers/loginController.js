const Member = require("../models/MemberModel");

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

      // Check if the email exists
      Member.findByEmail(email, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Server error", error: err });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const member = results[0];

        if (member.password !== password) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        // Update login status
        Member.updateLoginStatus(
          member.member_id,
          1,
          (updateErr, updateResults) => {
            if (updateErr) {
              return res.status(500).json({
                message: "Error updating login status",
                error: updateErr,
              });
            }

            // Login successful
            res.json({ message: "Login successful", memberId: member.id });
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = LoginController;
