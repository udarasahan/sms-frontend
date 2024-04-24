// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToDatabase = require("./db/mongoose"); // Adjust the path based on your project structure
const Routes = require("./routes/route.js");

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests with a size limit of 10mb
app.use(express.json({ limit: '10mb' }));

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to MongoDB using the provided function
connectToDatabase();

// Use the defined routes from the imported 'Routes' module
app.use('/', Routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is up and runing on Port no. ${PORT}`);
});
