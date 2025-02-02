const db = require("./db");
const Payment = require("./PaymentModel");

const PaymentMethod = {
  create: (paymentMethod, callback) => {
    Payment.getById(Payment.idPayment, (err, paymentResults) => {
      if (err) {
        return callback(err);
      }

      if (paymentResults.length === 0) {
        return callback(new Error("Payment method not found"));
      }

      const paymentMethodCode = paymentResults[0].paymentMethodCode;
      const sql =
        "INSERT INTO payment-method (payment-method-code, description) VALUES (?, ?)";
      db.query(sql, [paymentMethodCode, paymentMethod.description], callback);
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM payment-method", callback);
  },
};

module.exports = PaymentMethod;
