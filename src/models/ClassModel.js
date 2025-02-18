const db = require("../config/db");

const GymClass = {
  getAll: (callback) => {
    db.query(
      "SELECT className, schedule, duration, price, image FROM class",
      callback
    );
  },

  getByCode: (Code, callback) => {
    db.query("SELECT * FROM class WHERE classCode = ?", [Code], callback);
  },

  create: (classData, callback) => {
    db.query("INSERT INTO class SET ?", classData, callback);
  },

  getClassCodeByName: (className) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT classCode FROM class WHERE LOWER(className) = LOWER(?)";
      db.query(query, [className], (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }

        if (results.length > 0) {
          resolve(results[0].classCode);
        } else {
          console.log(`Class not found: ${className}`);
          reject(new Error("Class not found")); // Better error handling
        }
      });
    });
  },

  // ANDROID
  delete: (classCode, callback) => {
    const query = "DELETE FROM class WHERE classCode = ?";
    db.query(query, [classCode], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // ANDROID
  getSpecificClassData: (callback) => {
    db.query(
      "SELECT classCode, className, type, schedule, duration, price FROM class",
      callback
    );
  },

  // ANDROID
  updateClass: (name, type, schedule, duration, price, classCode) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE class SET className = ?, type = ?, schedule = ?, duration = ?, price = ? WHERE classCode = ?`;
      db.query(
        sql,
        [name, type, schedule, duration, price, classCode],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};

module.exports = GymClass;
