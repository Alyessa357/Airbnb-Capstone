// Import mongoose so we can connect to MongoDB
const dns = require("dns");
const mongoose = require("mongoose");

// Local DNS proxies (127.0.0.1) often reject SRV lookups required by mongodb+srv URIs
const dnsServers = dns.getServers();
if (dnsServers.some((server) => server.startsWith("127."))) {
  dns.setServers([
    "8.8.8.8",
    "1.1.1.1",
    ...dnsServers.filter((server) => !server.startsWith("127.")),
  ]);
}

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