const db = require("../config/db");

const WorkoutModel = {
  getWorkOutInfo: (id, callback) => {
    const query =
      "SELECT className,schedule,duration FROM class join member_gymclass on class.classCode=member_gymclass.class_code  WHERE member_id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return callback(err, null);
      }
      callback(null, result); //new commit added
    });
  },
};
