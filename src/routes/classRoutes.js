const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router();

router.get("/class", classController.getAllClasses);

module.exports = router;
