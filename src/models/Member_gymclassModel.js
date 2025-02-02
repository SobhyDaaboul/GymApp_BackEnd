const db = require("../config/db");

const MemberGymClass = {
  create: (memberGymClass, callback) => {
    const sql = `
      INSERT INTO member_gymclass (member-id, class_code, discount) 
      VALUES (?, ?, ?)`;
    db.query(
      sql,
      [
        memberGymClass.member - id,
        memberGymClass.class_code,
        memberGymClass.discount,
      ],
      callback
    );
  },

  delete: (member_id, callback) => {
    db.query(
      "DELETE FROM member_gymclass WHERE member-id = ?",
      [member_id],
      callback
    );
  },
};

module.exports = MemberGymClass;
