const db = require("../config/db"); // Assuming your database connection is set up here

const Member = {
  // Check if email exists
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM members WHERE email = ?";

    db.query(query, [email], (err, results) => {
      if (err) {
        return callback(err, null); // Return error if any
      }
      callback(null, results); // Return the query results
    });
  },

  // Create new member
  create: (memberData, callback) => {
    const query =
      "INSERT INTO members (name, phoneNumber, email, password, isLoggedIn) VALUES (?, ?, ?, ?, ?)";

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
        if (err) {
          return callback(err, null); // Return error if any
        }
        callback(null, results); // Return the query results
      }
    );
  },

  // Fetch member by ID (optional)
  findById: (id, callback) => {
    const query = "SELECT * FROM members WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = Member;
