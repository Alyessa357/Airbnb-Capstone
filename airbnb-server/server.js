// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");

// Import database connection
const connectDB = require("./config/db");

// Import routes
const listingRoutes = require("./routes/listingRoutes");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

// Create express application
const app = express();

// Connect to database
connectDB();

// MIDDLEWARE

// Allows frontend requests
app.use(cors());

// Allows JSON body data
app.use(express.json());

// Register routes
app.use("/api/listings", listingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

// Test Route
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Airbnb API Running Successfully"
  });

});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});