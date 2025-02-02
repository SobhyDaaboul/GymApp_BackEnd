const router = require("express").Router();

const MembershipController = require("../controllers/membershipController");

router.post("/membership", MembershipController.createMembership);
router.get("/membership", MembershipController.getAllMemberships);
router.get("/membership/:id", MembershipController.getMembershipById);
router.delete("/membership/:id", MembershipController.deleteMembership);

module.exports = router;
