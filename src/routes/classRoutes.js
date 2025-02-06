const express = require("express");
const classController = require("../controllers/ClassController");

const router = express.Router();

router.get("/class", classController.getAllClasses);

module.exports = router;
