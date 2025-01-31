const router = require("express").Router();

const { bookClass } = require("../controllers/class");

router.route("/book").post(bookClass);

module.exports = router;
