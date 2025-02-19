const router = require("express").Router();
const MemberGymClassController = require("../controllers/MemberGymClassController");

router.post("/:memberId/book-class", MemberGymClassController.bookClass);

module.exports = router;
