const router = require("express").Router();

const employeeRoutes = require("./EmployeeRoutes");
const membershipRoutes = require("./MembershipRoutes");
const memberRoutes = require("./MemberRoutes");
const memberGymClassRoutes = require("./Member_gymclassRoutes");
const paymentRoutes = require("./PaymentRoutes");
const gymClassRoutes = require("./ClassRoutes");

// Mounting the routes
router.use("/employee", employeeRoutes); // Employee routes
router.use("/membership", membershipRoutes); // Membership routes
router.use("/member", memberRoutes); // Member routes
router.use("/membergymclass", memberGymClassRoutes); // Member Gym Class routes
router.use("/payments", paymentRoutes); // Payment routes
router.use("/class", gymClassRoutes); // Gym Class routes

module.exports = router;
