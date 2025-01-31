const express = require("express");
const router = express.Router();

const classRoute = require("./classRoutes");
const loginRoute = require("./loginRoutes");

router.use("/class", classRoute);
router.use("/login", loginRoute);

module.exports = router;
