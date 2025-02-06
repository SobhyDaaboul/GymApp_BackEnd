const router = require("express").Router;
const classController = require("../controllers/ClassController");

router.get("/class", classController.getAllClasses);

module.exports = router;
