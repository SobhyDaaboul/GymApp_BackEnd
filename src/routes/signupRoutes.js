const express = require("express");
const signupController = require("../controllers/signupController");

const router = express.Router();

router.post("/", signupController.signup); // Use the 'create' route for signup

module.exports = router;
