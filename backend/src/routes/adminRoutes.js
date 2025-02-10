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

module.exports = router;
