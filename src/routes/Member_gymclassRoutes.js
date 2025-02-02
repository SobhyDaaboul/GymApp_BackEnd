const router = require("express").Router();

const MemberGymClassController = require("../controllers/MemberGymClassControllerController");

router.post(
  "/member-gymclasses",
  MemberGymClassController.createMemberGymClass
);
router.delete(
  "/member-gymclasses/:member_id",
  MemberGymClassController.deleteMemberGymClass
);

module.exports = router;
