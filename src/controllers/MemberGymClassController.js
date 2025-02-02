const MemberGymClass = require("../models/Member_gymclassModel");

const MemberGymClassController = {
  createMemberGymClass: (req, res) => {
    MemberGymClass.create(req.body, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(results);
    });
  },

  deleteMemberGymClass: (req, res) => {
    const member_id = req.params.member_id;
    MemberGymClass.delete(member_id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = MemberGymClassController;
