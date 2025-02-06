const Payment = require("../models//PaymentModel");

const PaymentController = {
  createPayment: (req, res) => {
    Payment.create(req.body, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json(results);
    });
  },

  getAllPayments: (req, res) => {
    Payment.getAll((err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },

  getPaymentById: (req, res) => {
    const id = req.params.id;
    Payment.getById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Payment not found" });
      res.json(results[0]);
    });
  },

  deletePayment: (req, res) => {
    const id = req.params.id;
    Payment.delete(id, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(204).send();
    });
  },
};

module.exports = PaymentController;
