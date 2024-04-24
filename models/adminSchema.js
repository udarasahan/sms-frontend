// Import the mongoose library
const mongoose = require("mongoose")

// Define the Admin Schema
const adminSchema = new mongoose.Schema({
    // Name of the admin
    name: {
        type: String,
        required: true,
    },
    // Email of the admin (unique)
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // Password of the admin
    password: {
        type: String,
        required: true,
    },
    // Role of the admin (default is "Admin")
    role: {
        type: String,
        default: "Admin"
    },
    // School name associated with the admin (unique)
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
});

// Export the Admin model with the defined schema
module.exports = mongoose.model("admin", adminSchema)
