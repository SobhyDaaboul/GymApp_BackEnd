const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.get("/", classController.getAllClasses);
router.get("/specific", classController.getSpecificClassData);
router.delete("/:classCode", classController.deleteClass);
router.put("/update/:classCode", classController.updateClass);

module.exports = router;
