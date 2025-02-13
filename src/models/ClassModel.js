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
