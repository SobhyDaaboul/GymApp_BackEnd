const router = require("express").Router();
const verifyToken = require("../middleware/Auth");
const MemberGymClassController = require("../controllers/MemberGymClassController");

router.post("/bookclass", verifyToken, MemberGymClassController.createBooking);
router.post(
  "/booksession",
  verifyToken,
  MemberGymClassController.createSession
);
module.exports = router;
