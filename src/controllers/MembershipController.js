const Membership = require("../models/MembershipModel"); // Import the Membership model

const MembershipController = {
  // Create a new membership
  createMembership: (req, res) => {
    const { startDate, endDate, membershipType, cost, status, memberId } =
      req.body;

    // Validate required fields
    if (
      !startDate ||
      !endDate ||
      !membershipType ||
      !cost ||
      !status ||
      !memberId
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // First, check if the member already has an active membership
    Membership.checkMembership(memberId, (err, existingMembership) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking membership.", error: err });
      }

      if (existingMembership) {
        // If the member already has an active membership, return an error
        return res
          .status(400)
          .json({ message: "This member already has an active membership." });
      }

      // Prepare membership data if no existing active membership
      const membershipData = {
        startDate,
        endDate,
        membershipType,
        cost,
        status,
        membershipId: memberId, // Assuming memberId is passed from the request body
      };

      // Call the model method to create the new membership
      Membership.create(membershipData, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error creating membership.", error: err });
        }
        res
          .status(201)
          .json({ message: "Membership created successfully.", result });
      });
    });
  },

  // Check if a member has an active membership
  checkMembership: (req, res) => {
    const { memberId } = req.params;

    // Validate memberId
    if (!memberId) {
      return res.status(400).json({ message: "Member ID is required." });
    }

    // Call the model method to check if membership exists
    Membership.checkMembership(memberId, (err, membership) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking membership.", error: err });
      }

      if (!membership) {
        return res
          .status(404)
          .json({ message: "No membership found for this member." });
      }

      res.status(200).json({ message: "Membership found.", membership });
    });
  },

  getMembershipDetails: (req, res) => {
    const { userId } = req.body; // Get `userId` from request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const query = "SELECT * FROM membership WHERE member_id = ?";

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching membership data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Membership not found" });
      }

      const membershipDetails = results[0]; // Assuming there's only one result
      res.json(membershipDetails); // Send membership data back to frontend
    });
  },

  // Delete a membership by ID
  deleteMembership: (req, res) => {
    const { id } = req.params;

    // Validate membership ID
    if (!id) {
      return res.status(400).json({ message: "Membership ID is required." });
    }

    // Call the model method to delete the membership
    Membership.delete(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting membership.", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Membership not found." });
      }

      res
        .status(200)
        .json({ message: "Membership deleted successfully.", result });
    });
  },
};

module.exports = MembershipController;
