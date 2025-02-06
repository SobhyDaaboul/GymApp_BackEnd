const router = require("express").Router();
const employeeController = require("../controllers/EmployeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);

module.exports = router;
