const router = require("express").Router();

const classRoute = require("./class");

router.use("/class", classRoute);

module.exports = router;
