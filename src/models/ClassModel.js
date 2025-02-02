const db = require("./db");

const GymClass = {
  getAll: (callback) => {
    db.query("SELECT * FROM class", callback);
  },

  getByCode: (Code, callback) => {
    db.query("SELECT * FROM class WHERE classCode = ?", [Code], callback);
  },
};

module.exports = GymClass;
