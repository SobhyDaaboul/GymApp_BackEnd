const db = require("../config/db");

const MemberGymClass = {
  createBooking: (memberId, classCode, callback) => {
    const sql =
      "INSERT INTO member_gymclass (member_id, class_code) VALUES (?, ?)";
    db.query(sql, [memberId, classCode], (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return callback(err, null);
      }
      callback(null, result); //new commit added
    });
  }, //new

  findExistingBooking: (memberId, classCode, callback) => {
    const sql =
      "SELECT * FROM member_gymclass WHERE member_id = ? AND class_code = ?";
    db.query(sql, [memberId, classCode], (err, rows) => {
      if (err) {
        console.error("Error finding booking:", err);
        return callback(err, null);
      }
      callback(null, rows[0]); // Return the first record (if exists)
    });
  },
};

module.exports = MemberGymClass;
