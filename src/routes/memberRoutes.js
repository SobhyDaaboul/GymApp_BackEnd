const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");

// Make sure the methods in MemberController are correctly named and defined
router.get("/", MemberController.getAllMembers);
router.get("/:id", MemberController.getMemberById);
router.delete("/:id", MemberController.deleteMember);

module.exports = router;
