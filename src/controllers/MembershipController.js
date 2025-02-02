const Membership = require("../models/MembershipModel");

const MembershipController = {
  createMembership: (req, res) => {
    Membership.create(req.body, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(results);
    });
  },

  getAllMemberships: (req, res) => {
    Membership.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  getMembershipById: (req, res) => {
    const id = req.params.id;
    Membership.getById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Membership not found" });
      res.json(results[0]);
    });
  },

  deleteMembership: (req, res) => {
    const id = req.params.id;
    Membership.delete(id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = MembershipController;
