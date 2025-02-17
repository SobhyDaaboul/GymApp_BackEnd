const Member = require("../models/MemberModel");

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

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
        Member.updateLoginStatus(member.member_id, 1, (updateErr) => {
          if (updateErr) {
            return res.status(500).json({
              message: "Error updating login status",
              error: updateErr,
            });
          }

          // ✅ Send only the success message
          res.json({ message: "Login successful" });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = LoginController;
