// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/speccode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes'); // Assuming your routes are defined in this file
app.use('/api/users', userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
