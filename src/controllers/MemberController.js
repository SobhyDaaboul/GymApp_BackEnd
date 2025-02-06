const Member = require("../models/MemberModel");

const MemberController = {
  createMember: (req, res) => {
    // Validate required fields
    const { name, phoneNumber, email, password } = req.body;

    // Check if any required field is missing
    if (!name || !phoneNumber || !email || !password) {
      return res.status(400).json({
        message: "All fields (name, phone, email, password) are required",
      });
    }

    // Check if email already exists
    Member.getByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error checking email",
          error: err,
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }

      // Add isLoggedIn field with value 0 (not logged in)
      const memberData = { ...req.body, isLoggedIn: 0 };

      // Proceed to create the member if email doesn't exist
      Member.create(memberData, (err, results) => {
        if (err)
          return res.status(500).json({
            message: "Error creating member",
            error: err,
          });
        res.status(201).json({
          message: "Member created successfully",
          id: results.insertId,
        });
      });
    });
  },

  getAllMembers: (req, res) => {
    Member.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  getMemberById: (req, res) => {
    const id = req.params.id;
    Member.getById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Member not found" });
      res.json(results[0]);
    });
  },

  getMemberByEmail: (req, res) => {
    const email = req.params.email;
    Member.getByEmail(email, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Member not found" });
      res.json(results[0]);
    });
  },

  deleteMember: (req, res) => {
    const id = req.params.id;
    Member.delete(id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = MemberController;
