const MemberGymClass = require("../models/Member_gymclassModel");
const isLoggedIn = require("../controllers/isLoggedIn");

const MemberGymClassController = {
  createMemberGymClass: (req, res) => {
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

    MemberGymClass.create(req.body, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(results);
    });
  },

  deleteMemberGymClass: (req, res) => {
    // Check if the user is logged in
    if (!req.user || !req.user.isLoggedIn) {
      return res.status(401).json({ message: "Please log in first" });
    }

    const member_id = req.params.member_id;
    MemberGymClass.delete(member_id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = MemberGymClassController;
