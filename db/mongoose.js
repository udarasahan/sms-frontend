// Import necessary modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

// Use the direct database URL obtained from environment variables
const directDBURL = process.env.MONGO_URL;

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    // Function to connect to the MongoDB database
    await mongoose.connect(directDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a success message if the connection is successful
    console.log("Connected to MongoDB");
  } catch (err) {
    // Log an error message if there's an issue with the connection
    console.log("NOT CONNECTED TO NETWORK", err);
  }
};

// Export the connectToDatabase function for use in other files
module.exports = connectToDatabase;
