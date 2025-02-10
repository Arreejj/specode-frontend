// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/speccode")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes"); // User-related routes
const adminRoutes = require("./routes/adminRoutes"); // Admin-related routes

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); // Admin Routes for fetching users

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
