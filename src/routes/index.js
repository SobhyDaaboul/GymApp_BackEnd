const router = require("express").Router();

const employeeRoutes = require("./employeeRoutes");
const membershipRoutes = require("./membershipRoutes");
const memberRoutes = require("./memberRoutes");
const memberGymClassRoutes = require("./Member_gymclassRoutes");
const paymentRoutes = require("./paymentRoutes");
const gymClassRoutes = require("./ClassRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes"); // Ensure you add signupRoutes here

// Mounting the routes
router.use("/employee", employeeRoutes); // Employee routes
router.use("/membership", membershipRoutes); // Membership routes
router.use("/member", memberRoutes); // Member routes
router.use("/membergymclass", memberGymClassRoutes); // Member Gym Class routes
router.use("/payment", paymentRoutes); // Payment routes
router.use("/class", gymClassRoutes); // Gym Class routes
router.use("/login", loginRoutes); // loginRoutes
router.use("/signup", signupRoutes); // Signup routes

module.exports = router;
