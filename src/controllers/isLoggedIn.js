const isLoggedIn = (req, res, next) => {
  const email = req.body.email; // Assuming email is sent in the request body

  if (!email) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this page." });
  }

  db.query(
    "SELECT isLoggedIn FROM member WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error checking login status" });
      }

      if (results.length === 0 || results[0].isLoggedIn !== 1) {
        return res
          .status(401)
          .json({ message: "You must be logged in to access this page." });
      }

      // If logged in, proceed to the next middleware or route
      next();
    }
  );
};

module.exports = isLoggedIn;
