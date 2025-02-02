const db = require("../config/db");

const Employee = {
  getAll: (callback) => {
    db.query("SELECT * FROM employee", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM employees WHERE idemployee = ?", [id], callback);
  },
};

module.exports = Employee;
