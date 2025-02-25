const db = require("../config/db");

const Employee = {
  getAll: (callback) => {
    db.query(
      "SELECT idemployee,sessionCode,name, phoneNumber, schedule, rate, description, image FROM employee",
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

  //ANDROID
  delete: (idemployee, callback) => {
    const query = "DELETE FROM employee WHERE idemployee = ?";
    db.query(query, [idemployee], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  //ANDROID
  updateEmployee(name, phoneNumber, rate, schedule, idemployee) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE employee SET name = ?, phoneNumber = ?, rate = ?, schedule = ? WHERE idemployee = ?`;
      db.query(
        sql,
        [name, phoneNumber, rate, schedule, idemployee],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};

module.exports = Employee;
