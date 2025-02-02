const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

router.get("/employee", employeeController);

module.exports = router;
