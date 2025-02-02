const db = require("../config/db");

const Member = {
  create: (member, callback) => {
    const sql =
      "INSERT INTO member (name, email, password, phoneNumber) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [member.name, member.email, member.password, member.phoneNumber],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM member", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM member WHERE member-id = ?", [id], callback);
  },

  getByEmail: (email, callback) => {
    db.query("SELECT * FROM member WHERE email = ?", [email], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM member WHERE member-id = ?", [id], callback);
  },
};

module.exports = Member;
