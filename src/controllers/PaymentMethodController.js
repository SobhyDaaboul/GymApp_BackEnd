const PaymentMethod = require("../models/PaymentMethodModel");

const PaymentMethodController = {
  createPaymentMethod: (req, res) => {
    const { paymentMethodCode, description } = req.body;
    PaymentMethod.create({ paymentMethodCode, description }, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating payment method", error: err });
      res.status(201).json(results);
    });
  },
  getAllPaymentMethods: (req, res) => {
    PaymentMethod.getAll((err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error fetching payment methods", error: err });
      res.status(200).json(results);
    });
  },
};

module.exports = PaymentMethodController;
