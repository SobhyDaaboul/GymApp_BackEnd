const router = require("express").Router();
const employeeController = require("../controllers/EmployeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.get("/specific", employeeController.getSpecificData);
router.delete("/:idemployee", employeeController.deleteEmployee);
router.put("/update/:idemployee", employeeController.updateEmployee);

module.exports = router;
