const router = require("express").Router();

const MemberGymClassController = require("../controllers/MemberGymClassController");

router.post("/book-class", MemberGymClassController.bookClass);

module.exports = router;
