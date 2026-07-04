// Import mongoose so we can connect to MongoDB
const mongoose = require("mongoose");

// Function responsible for connecting to MongoDB
const connectDB = async () => {
  try {

    // Attempt connection
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {

    console.error(
      `Database Connection Error: ${error.message}`
    );

    process.exit(1);
  }
};

// Export function
module.exports = connectDB;