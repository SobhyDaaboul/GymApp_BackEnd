const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router();

router.get("/", classController.getAllClasses);
router.get("/specific", classController.getSpecificClassData);
router.delete("/:classCode", classController.deleteClass);
router.put("/update/:classCode", classController.updateClass);

module.exports = router;
