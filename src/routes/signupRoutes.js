const express = require("express");
const signupController = require("../controllers/signupController");

<<<<<<< HEAD
router.post("/", signupController.signup);
=======
const router = express.Router();

router.post("/", signupController.signup); // Use the 'create' route for signup
>>>>>>> 9792dffe3b28565559b796093f5120daa837f181

module.exports = router;
