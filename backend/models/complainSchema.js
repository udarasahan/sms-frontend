// Import the mongoose library
const mongoose = require('mongoose');

// Define the Complain Schema
const complainSchema = new mongoose.Schema({
    // User associated with the complain (reference to the 'student' model)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student', // Reference to the 'student' model
        required: true
    },
    // Date when the complain was made
    date: {
        type: Date,
        required: true
    },
    // Complaint message
    complaint: {
        type: String,
        required: true
    },
    // School associated with the complain (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
        required: true,
    }
});

// Export the Complain model with the defined schema
module.exports = mongoose.model("complain", complainSchema);
