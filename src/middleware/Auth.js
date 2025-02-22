const jwt = require("jsonwebtoken");
const SECRET_KEY = "qwertyytrewqazxxzaq"; // Replace with your actual secret key

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token. Authentication failed." });
  }
  console.log("Received token:", token);
  console.log("Decoded user:", decoded);
};

// ✅ Correct export
module.exports = authenticateUser;
