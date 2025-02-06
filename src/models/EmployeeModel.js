const db = require("../config/db");

const Employee = {
  getAll: (callback) => {
    db.query(
      "SELECT idemployee, name, phoneNumber, schedule, rate, description, image FROM employee",
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      "SELECT idemployee, name, phoneNumber, schedule, rate, description, image FROM employee WHERE idemployee = ?",
      [id],
      callback
    );
  },
};

module.exports = Employee;
