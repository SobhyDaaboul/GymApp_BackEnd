const db = require("../config/db");

class MemberGymClass {
  static async createBooking(memberId, class_code) {
    const [result] = await db.query(
      "INSERT INTO member_gymclass (member_id, class_code) VALUES (?, ?)",
      [memberId, class_code]
    );
    return result;
  }

  static async findExistingBooking(member_id, class_code) {
    const [rows] = await db.query(
      "SELECT * FROM member_gymclass WHERE member_id = ? AND class_code = ?",
      [member_id, class_code]
    );
    return rows[0];
  }
}

module.exports = MemberGymClass;
