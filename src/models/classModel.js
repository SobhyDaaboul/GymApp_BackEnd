const db = require("../config/db");

// Get class by classcode
exports.getClassByCode = (classcode, callback) => {
  const query = "SELECT * FROM class WHERE classcode = ?";
  db.query(query, [classcode], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
