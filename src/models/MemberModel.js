const db = require("../config/db");

const Member = {
  // Check if email exists
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM member WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Create new member
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

  // Fetch member by ID
  findById: (id, callback) => {
    const query = "SELECT * FROM member WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Fetch all members
  findAll: (callback) => {
    const query = "SELECT * FROM member";
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Delete member by ID
  delete: (id, callback) => {
    const query = "DELETE FROM members WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  findMembers: (callback) => {
    const query =
      "SELECT member-id, name, email, password, phoneNumber FROM member";
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  deleteById(memberId, callback) {
    const query = "DELETE FROM member WHERE id = ?";
    db.query(query, [memberId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  updateLoginStatus(memberId, status, callback) {
    const query = "UPDATE member SET isLoggedIn = ? WHERE member_id = ?";
    db.query(query, [status, memberId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = Member;
