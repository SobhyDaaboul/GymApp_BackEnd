const db = require("../config/db");

const MemberGymClass = {
  // Function to add a member to a gym class
  addMemberToGymClass: (member_id, classCode, callback) => {
    const query = `
      INSERT INTO member_gymclass (member_id, class_code)
      VALUES (?, ?)`;

    db.query(query, [member_id, classCode], (err, result) => {
      if (err) {
        console.error("Error adding member to class:", err);
        return callback(err, null); // Pass error to callback
      }
      console.log("Booking successful: ", result);
      callback(null, result); // Pass result to callback
    });
  },

  delete: (member_id, callback) => {
    db.query(
      "DELETE FROM member_gymclass WHERE member_id = ?",
      [member_id],
      callback
    );
  },
};

module.exports = MemberGymClass;
