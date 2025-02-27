const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const verifyToken = require("../middleware/Auth");

//React
router.get("/getclasses", classController.getAllClasses);

router.get("/getbookedclass", verifyToken, classController.fetchBookedClasses);
router.get(
  "/getbookedsession",
  verifyToken,
  classController.fetchBookedSessions
);

//Android
router.get("/specific", classController.getSpecificClassData);
router.delete("/:classCode", classController.deleteClass);
router.put("/update/:classCode", classController.updateClass);

module.exports = router;
