const router = require("express").Router();

const memberController = require("../controllers/memberController");

router.post("/member", memberController.create);

module.exports = router;
