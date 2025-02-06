const router = require("express").Router();

const employeeRoutes = require("./employeeRoutes");
const membershipRoutes = require("./membershipRoutes");
const memberRoutes = require("./memberRoutes");
const memberGymClassRoutes = require("./Member_gymclassRoutes");
const paymentRoutes = require("./paymentRoutes");
const gymClassRoutes = require("./ClassRoutes");
const loginRoutes = require("./loginRoutes");

// Mounting the routes
router.use("/employee", employeeRoutes); // Employee routes
router.use("/membership", membershipRoutes); // Membership routes
router.use("/member", memberRoutes); // Member routes
router.use("/membergymclass", memberGymClassRoutes); // Member Gym Class routes
router.use("/payments", paymentRoutes); // Payment routes
router.use("/class", gymClassRoutes); // Gym Class routes
router.use("/login", loginRoutes); // loginroutes

module.exports = router;
