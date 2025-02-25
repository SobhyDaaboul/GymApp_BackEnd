const router = require("express").Router();
const verifyToken = require("../middleware/Auth");
const MemberGymClassController = require("../controllers/MemberGymClassController");

router.post("/bookclass", verifyToken, MemberGymClassController.createBooking);

module.exports = router;
