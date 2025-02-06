const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");

router.post("/", MemberController.createMember);
router.get("/", MemberController.getAllMembers);
router.get("/:id", MemberController.getMemberById);
router.get("/email/:email", MemberController.getMemberByEmail);
router.delete("/:id", MemberController.deleteMember);

module.exports = router;
