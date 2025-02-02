const express = require("express");
const router = express.Router();

const classRoute = require("./class");
const loginRoute = require("./login");

router.use("/class", classRoute);
router.use("/login", loginRoute);

module.exports = router;
