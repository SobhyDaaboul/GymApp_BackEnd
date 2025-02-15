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

  getClassCodeByName: (className, callback) => {
    const query = "SELECT classCode FROM class WHERE className = ?";
    db.query(query, [className], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        if (results.length > 0) {
          callback(null, results[0].classCode);
        } else {
          callback("Class not found", null);
        }
      }
    });
  },
  // Function to insert booking details into member_gymclass table
  saveBooking: (memberId, classCode, callback) => {
    const query =
      "INSERT INTO member_gymclass (member_id, classCode) VALUES (?, ?, ?)";
    db.query(query, [memberId, classCode], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
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

  //ANDROID
  getSpecificClassData: (callback) => {
    db.query(
      "SELECT classCode, className, type, schedule, duration, price FROM class",
      callback
    );
  },
};

module.exports = GymClass;
