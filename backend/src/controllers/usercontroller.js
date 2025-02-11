const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// ✅ User Signup
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, userType } = req.body; // Include userType

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      userType: userType || "user" // Default to "user" if not provided
    });

    await user.save();

    const token = jwt.sign({ id: user.id, email }, "secretkey", { expiresIn: "3h" });

    res.status(201).json({ token, message: "Signup successful", user: { username, email, userType } });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ✅ User Login
// ✅ User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email, userType: user.userType }, "secretkey", { expiresIn: "3h" });

    // Check if user is an admin
    if (user.userType === "admin") {
      return res.json({ 
        message: "Login successful", 
        token, 
        redirect: "/admin-dashboard", // Frontend should handle redirection
        user: { username: user.username, email, userType: user.userType } 
      });
    }

    res.json({ 
      message: "Login successful", 
      token, 
      redirect: "/user-dashboard", // Normal users go here
      user: { username: user.username, email, userType: user.userType } 
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated successfully!", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete User Account
exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
