const db = require("../config/db");

const MemberGymClass = {
  create: (memberGymClass, callback) => {
    const sql = `
      INSERT INTO member_gymclass (member_id, class_code, selectedDay) 
      VALUES (?, ?, ?)`;
    db.query(
      sql,
      [
        memberGymClass.member - id,
        memberGymClass.class_code,
        memberGymClass.selectedDay,
      ],
      callback
    );
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
