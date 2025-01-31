const db = require("../config/db");

// Book a class for a member by inserting into class_member table
exports.bookClassForMember = (classcode, memberId, callback) => {
  const query = "INSERT INTO class_member (classcode, memberId) VALUES (?, ?)";
  db.query(query, [classcode, memberId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
