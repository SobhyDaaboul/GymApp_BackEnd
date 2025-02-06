const db = require("../config/db");
const Membership = require("./MembershipModel");
const PaymentMethod = require("./PaymentMethodModel");

const Payment = {
  create: (payment, callback) => {
    Membership.getById(payment.membership_id, (err, membershipResults) => {
      if (err) {
        return callback(err);
      }

      if (membershipResults.length === 0) {
        return callback(new Error("Membership not found"));
      }

      const membership = membershipResults[0];
      const membershipType = membership.membershipType;

      let amount = 0;
      if (membershipType === "Monthly") {
        amount = 30;
      } else if (membershipType === "Yearly") {
        amount = 300;
      }

      const effectiveDate = membership.endDate;

      const expectedDate = new Date(membership.startDate);
      expectedDate.setDate(expectedDate.getDate() + 5);

      const paymentMethodCode = payment.payment - method - code;

      const sql = `
        INSERT INTO payment (amount, effectiveDate, expectedDate, payment_method_code, membership_id) 
        VALUES (?, ?, ?, ?, ?)`;

      db.query(
        sql,
        [
          amount,
          effectiveDate,
          expectedDate,
          paymentMethodCode,
          payment.membership_id,
        ],
        callback
      );
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM payment", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM payment WHERE idPayment = ?", [id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM payment WHERE idPayment = ?", [id], callback);
  },
};

module.exports = Payment;
