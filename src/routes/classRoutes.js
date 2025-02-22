const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

//React
router.get("/classcode/:className", classController.getClassCodeByName);
router.get("/getclasses", classController.getAllClasses);

//Android
router.get("/specific", classController.getSpecificClassData);
router.delete("/:classCode", classController.deleteClass);
router.put("/update/:classCode", classController.updateClass);

module.exports = router;
