const router = require("express").Router();
const PaymentMethodController = require("../controllers/PaymentMethodController");

router.post("/payment-method", PaymentMethodController.createPaymentMethod);
router.get("/payment-method", PaymentMethodController.getAllPaymentMethods);

module.exports = router;
