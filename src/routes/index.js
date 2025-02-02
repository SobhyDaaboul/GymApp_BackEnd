const router = require("express").Router();

const Member_gymclassRoute = require("./Member_gymclassRoutes");
const signupRoutes = require("./SignUpRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/class", Member_gymclassRoute);
router.use();

module.exports = router;
