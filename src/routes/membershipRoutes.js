const router = require("express").Router();
const verifyToken = require("../middleware/Auth");

const MembershipController = require("../controllers/membershipController");

router.post("/create", verifyToken, MembershipController.createMembership);
router.get("/getMembershipInfo", MembershipController.getMembershipDetails);

module.exports = router;
