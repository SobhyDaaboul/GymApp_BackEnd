const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "qwertyytrewqazxxzaq"; // Use env variable in production

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Remove the "Bearer " part and trim any extra spaces, then verify the token
    const decoded = jwt.verify(token.replace("Bearer ", "").trim(), SECRET_KEY);
    console.log("Token verified successfully.");

    // Destructure the decoded object to extract 'id'
    // Then create a new object where 'member_id' is set to the value of 'id'
    const { id, ...others } = decoded;
    req.user = { member_id: id, ...others };

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(403)
      .json({ message: "Invalid token. Authentication failed." });
  }
};

module.exports = verifyToken;
