const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.get("/class", classController.getAll);

module.exports = router;
