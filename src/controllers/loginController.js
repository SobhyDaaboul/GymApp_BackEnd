const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/memberModel"); // Assuming this function exists to fetch a user by username

exports.login = async (req, res) => {
  try {
    // Step 1: Get the username and password from the request body
    const { username, password } = req.body;

    // Step 2: Check if the user exists in the database
    const user = await getUserByUsername(username); // You would need to implement this function in your model
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Step 3: Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Step 4: Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "your-secret-key", // Replace with your secret key
      { expiresIn: "1h" } // Token expiration (e.g., 1 hour)
    );

    // Step 5: Return a success response with the token
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
