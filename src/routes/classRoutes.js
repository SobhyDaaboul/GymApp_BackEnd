const router = require("expres").Router;
const classController = require("../controllers/classController");

router.get("/class", classController);

module.exports = router;
