const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username email"); // Fetch username & email only
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE a user by ID
router.delete("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "" });
    }
  });

module.exports = router;
