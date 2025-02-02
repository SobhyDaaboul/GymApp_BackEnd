const router = require("express").Router();

const { bookClass } = require("../controllers/classController");

router.post("/book", bookClass);

module.exports = router;
