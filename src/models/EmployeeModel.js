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

  //ANDROID
  getSpecificData: (callback) => {
    db.query(
      "SELECT idemployee, name, phoneNumber, schedule, rate FROM employee",
      callback
    );
  },

  delete: (idemployee, callback) => {
    const query = "DELETE FROM employee WHERE idemployee = ?";
    db.query(query, [idemployee], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
};

module.exports = Employee;
