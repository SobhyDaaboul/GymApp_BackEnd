const db = require("./db");

const Membership = {
  create: (membership, callback) => {
    const sql = `
      INSERT INTO membership (membershipType, startDate, endDate) 
      VALUES (?, NOW(),
        CASE 
          WHEN ? = 'Monthly' THEN DATE_ADD(NOW(), INTERVAL 1 MONTH) 
          WHEN ? = 'Yearly' THEN DATE_ADD(NOW(), INTERVAL 1 YEAR) 
          ELSE NULL 
        END)`;

    db.query(
      sql,
      [
        membership.membershipType,
        membership.membershipType,
        membership.membershipType,
      ],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM membership", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM membership WHERE idmembership = ?", [id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM membership WHERE idmembership = ?", [id], callback);
  },
};

module.exports = Membership;
