const db = require("../config/db");

const Membership = {
  create: (membershipData, callback) => {
    const sql =
      "INSERT INTO membership (startDate,endDate,membershipType,cost,status,member_id)VALUES(?,?,?,?,?,?)";
    db.query(
      sql,
      [
        membershipData.startDate,
        membershipData.endDate,
        membershipData.membershipType,
        membershipData.cost,
        membershipData.status,
        membershipData.membershipId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting booking:", err);
          return callback(err, null);
        }
        callback(null, result); //new commit added
      }
    );
  },

  checkMembership: (memberId, callback) => {
    const sql = "SELECT member_id FROM membership WHERE member_id = ? ";
    db.query(sql, [memberId], (err, rows) => {
      if (err) {
        console.error("Error finding your Membership:", err);
        return callback(err, null);
      }
      callback(null, rows[0]); // Return the first record (if exists)
    });
  }, //new

  getMembershipInfo: (id, callback) => {
    const query = "SELECT * FROM membership WHERE member_id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return callback(err, null);
      }
      callback(null, result); //new commit added
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM membership WHERE idmembership = ?", [id], callback);
  },
};

module.exports = Membership;
