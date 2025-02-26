// models/payment.js

const db = require("../config/db");

const Payment = {
  create: (paymentData, callback) => {
    const sql = `INSERT INTO payment (amount, effectiveDate, expectedDate, membership_id, paymentmethodcode)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        paymentData.amount,
        paymentData.effectiveDate,
        paymentData.expectedDate,
        paymentData.membershipId,
        paymentData.paymentMethodCode,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting payment:", err);
          return callback(err, null);
        }
        callback(null, result);
      }
    );
  },
};

module.exports = Payment;
