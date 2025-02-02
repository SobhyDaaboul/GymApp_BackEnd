const router = require("express").Router();
const MemberController = require("../controllers/MemberController");

router.post("/member", MemberController.createMember);
router.get("/member", MemberController.getAllMembers);
router.get("/member/:id", MemberController.getMemberById);
router.get("/member/email/:email", MemberController.getMemberByEmail);
router.delete("/member/:id", MemberController.deleteMember);

module.exports = router;
