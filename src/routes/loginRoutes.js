const router = require("express").Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.login); // Use the root route for login

module.exports = router;
