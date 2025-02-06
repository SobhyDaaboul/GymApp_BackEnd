const Membership = require("../models/MembershipModel");
const isLoggedIn = require("../controllers/isLoggedIn");

const MembershipController = {
  createMembership: (req, res) => {
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

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
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

    const id = req.params.id;
    Membership.delete(id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = MembershipController;
