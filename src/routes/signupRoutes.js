const router = require("express").Router();
const signupController = require("../controllers/signupController");

router.post("/create", signupController.createMember); // Use the 'create' route for signup

module.exports = router;
