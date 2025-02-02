const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

router.get("/employee", employeeController.getAllEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);

module.exports = router;
