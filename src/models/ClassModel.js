const db = require("../config/db");

const GymClass = {
  getAll: (callback) => {
    db.query("SELECT className, schedule, duration, price, image FROM class", callback);
  },

  getByCode: (Code, callback) => {
    db.query("SELECT * FROM class WHERE classCode = ?", [Code], callback);
  },

  create: (classData, callback) => {
    db.query("INSERT INTO class SET ?", classData, callback);
  },
};

module.exports = GymClass;
