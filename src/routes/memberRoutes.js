const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");

// Make sure the methods in MemberController are correctly named and defined
router.get("/", MemberController.getAllMembers);
router.get("/:id", MemberController.getMemberById);
router.delete("/:id", MemberController.deleteMember);
router.get("/specific", MemberController.getMembers);
router.put("/update/:id", MemberController.updateMember);

module.exports = router;
