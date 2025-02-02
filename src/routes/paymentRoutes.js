const router = require("express").Router();
const PaymentController = require("../controllers/PaymentController");

router.post("/payments", PaymentController.createPayment);
router.get("/payments", PaymentController.getAllPayments);
router.get("/payments/:id", PaymentController.getPaymentById);
router.delete("/payments/:id", PaymentController.deletePayment);

module.exports = router;
