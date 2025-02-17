const db = require("../config/db");

const Member = {
  // Create new member for signup
  create: (memberData, callback) => {
    const query =
      "INSERT INTO member (name, phoneNumber, email, password, isLoggedIn) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        memberData.name,
        memberData.phoneNumber,
        memberData.email,
        memberData.password,
        memberData.isLoggedIn,
      ],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },

  // Check if email exists for signup and login
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM member WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // get member by ID
  findById: (id, callback) => {
    const query = "SELECT * FROM member WHERE `member-id` = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // get all members
  findAll: (callback) => {
    const query = "SELECT * FROM member";
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  //for login
  updateLoginStatus(memberId, status, callback) {
    const query = "UPDATE member SET isLoggedIn = ? WHERE `member_id` = ?";
    db.query(query, [status, memberId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  //ANDROID
  updateMember(name, email, password, phoneNumber, memberId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE member SET name = ?, email = ?, password = ?, phoneNumber = ? WHERE \`member-id\` = ?`;
      db.query(
        sql,
        [name, email, password, phoneNumber, memberId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  // Delete member by ID android
  delete: (id, callback) => {
    const query = "DELETE FROM member WHERE `member-id` = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  //android
  findMembers: (callback) => {
    const query =
      "SELECT member-id, name, email, password, phoneNumber FROM member";
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
};

module.exports = Member;
