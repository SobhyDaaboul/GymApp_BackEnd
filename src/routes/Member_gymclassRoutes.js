const router = require("express").Router();

const Member_gymclass = require("../controllers/Member_gymclassController");

router.get("/member_gymclass", Member_gymclass);

module.exports = router;
