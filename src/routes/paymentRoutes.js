const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// Route for creating a payment
router.post("/create", paymentController.createPayment);

module.exports = router;
