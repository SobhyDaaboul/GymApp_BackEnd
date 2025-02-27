const db = require("../config/db");

const Membership = {
  create: (membershipData, callback) => {
    const sql =
      "INSERT INTO membership (startDate, endDate, membershipType, cost, status, member_id) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        membershipData.startDate,
        membershipData.endDate,
        membershipData.membershipType,
        membershipData.cost,
        membershipData.status,
        membershipData.memberId, // Fixed incorrect reference from membershipId to memberId
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting membership:", err);
          return callback && callback(err, null);
        }
        callback && callback(null, result);
      }
    );
  },

  checkMembership: (memberId, callback) => {
    const sql = "SELECT member_id FROM membership WHERE member_id = ?";
    db.query(sql, [memberId], (err, rows) => {
      if (err) {
        console.error("Error finding membership:", err);
        return callback && callback(err, null);
      }
      callback && callback(null, rows[0] || null); // Ensuring callback is called properly
    });
  },

  getMembershipInfo: (id, callback) => {
    const query = "SELECT * FROM membership WHERE member_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error fetching membership:", err);
        return callback && callback(err, null);
      }
      callback && callback(null, result);
    });
  },

  delete: (id, callback) => {
    db.query(
      "DELETE FROM membership WHERE idmembership = ?",
      [id],
      (err, result) => {
        if (err) {
          console.error("Error deleting membership:", err);
          return callback && callback(err, null);
        }
        callback && callback(null, result);
      }
    );
  },

  getMembershipInfoo: (userId, callback) => {
    db.query(
      "SELECT startDate, endDate, membershipType, cost, status FROM membership WHERE member_id = ?",
      [userId],
      (err, rows) => {
        if (err) {
          console.error("Error fetching membership:", err);
          return callback && callback(err, null);
        }
        callback && callback(null, rows.length > 0 ? rows[0] : null);
      }
    );
  },
};

module.exports = Membership;
