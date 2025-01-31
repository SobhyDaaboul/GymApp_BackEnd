const db = require("../config/db");

// Get member by memberId
exports.getMemberById = (memberId, callback) => {
  const query = "SELECT * FROM member WHERE memberId = ?";
  db.query(query, [memberId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
