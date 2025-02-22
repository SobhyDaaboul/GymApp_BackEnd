const router = require("express").Router();
const authenticateUser = require("../middleware/Auth");
const memberGymClassController = require("../controllers/MemberGymClassController"); // ✅ Import the instance

console.log(authenticateUser);

router.post(
  "/bookclass",
  authenticateUser,
  memberGymClassController.bookClass // ✅ Ensure it's a function
);

module.exports = router;
