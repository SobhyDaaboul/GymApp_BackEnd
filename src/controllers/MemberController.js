const Member = require("../models/MemberModel");

const MemberController = {
  createMember: (req, res) => {
    Member.create(req.body, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(results);
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
