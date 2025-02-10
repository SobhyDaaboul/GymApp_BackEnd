const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");

// Make sure the methods in MemberController are correctly named and defined
router.get("/", MemberController.getAllMembers);
router.get("/:id", MemberController.getMemberById);
router.get("/email/:email", MemberController.getMemberByEmail);
router.delete("/:id", MemberController.deleteMember);
router.get("/specific", MemberController.getMembers);

module.exports = router;
