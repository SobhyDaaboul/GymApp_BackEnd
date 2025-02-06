const db = require("../config/db");
const bcrypt = require("bcryptjs");

const Member = {
  create: (member, callback) => {
    if (!member.phoneNumber) {
      return callback(new Error("Phone number is required"), null);
    }

    bcrypt.hash(member.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return callback(err, null);
      }

      const sql =
        "INSERT INTO member (name, phoneNumber, email, password) VALUES (?, ?, ?, ?)";

      db.query(
        sql,
        [member.name, member.phoneNumber, member.email, member.password], // Passing values in the same order as in the query
        (err, result) => {
          if (err) {
            console.error("Error creating member:", err);
            return callback(err, null); // Send the error back through the callback
          }
          callback(null, result); // On success, return the result through the callback
        }
      );
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM member", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM member WHERE member_id = ?", [id], callback); // Corrected column name
  },

  getByEmail(email, callback) {
    const query = "SELECT * FROM members WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }
      if (results.length === 0) {
        console.log("No user found with email:", email);
        return callback(null, null); // Ensure we don't pass undefined
      }
      callback(null, results[0]); // Always return a valid object
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM member WHERE member_id = ?", [id], callback); // Corrected column name
  },

  comparePassword: (inputPassword, storedPassword, callback) => {
    bcrypt.compare(inputPassword, storedPassword, (err, isMatch) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, isMatch);
    });
  },
};

module.exports = Member;
