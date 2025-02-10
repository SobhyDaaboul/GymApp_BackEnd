const router = require("express").Router();
const employeeController = require("../controllers/EmployeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.get("/specific", employeeController.getSpecificData);

module.exports = router;
