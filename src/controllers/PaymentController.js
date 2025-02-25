const Payment = require("../models/PaymentModel");

const PaymentController = {
  createPayment: (req, res) => {
    const {
      amount,
      effectiveDate,
      expectedDate,
      membershipId,
      paymentMethodCode,
    } = req.body;

    if (
      !amount ||
      !effectiveDate ||
      !expectedDate ||
      !membershipId ||
      !paymentMethodCode
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const paymentData = {
      amount,
      effectiveDate,
      expectedDate,
      membershipId,
      paymentMethodCode,
    };

    Payment.create(paymentData, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating payment", error: err });
      }
      return res.status(201).json({
        message: "Payment created successfully",
        paymentId: result.insertId,
      });
    });
  },

  getPaymentsByMembership: (req, res) => {
    const { membershipId } = req.params;

    Payment.getByMembershipId(membershipId, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving payments", error: err });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No payments found for this membership." });
      }
      return res.status(200).json({ payments: results });
    });
  },
};

module.exports = PaymentController;
