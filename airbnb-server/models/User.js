const mongoose = require("mongoose");

// Define the structure for user documents in MongoDB
const userSchema = new mongoose.Schema({

  // Display name for the user
  username: {
    type: String,
    required: true,
    trim: true
  },

  // Login email — must be unique across all users
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Hashed password (never store plain text)
  password: {
    type: String,
    required: true
  },

  // Controls access level: user, host, or admin
  role: {
    type: String,
    enum: ["user", "host", "admin"],
    default: "user"
  }

},
{
  // Automatically adds createdAt and updatedAt fields
  timestamps: true
});

// Register the schema as a Mongoose model
module.exports =
  mongoose.model("User", userSchema);