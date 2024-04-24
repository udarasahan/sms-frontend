// Import the mongoose library
const mongoose = require("mongoose")

// Define the Notice Schema
const noticeSchema = new mongoose.Schema({
    // Title of the notice
    title: {
        type: String,
        required: true
    },
    // Details or content of the notice
    details: {
        type: String,
        required: true
    },
    // Date when the notice was created
    date: {
        type: Date,
        required: true
    },
    // School associated with the notice (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
    },
}, { 
    // Enable timestamps to automatically manage 'createdAt' and 'updatedAt' fields
    timestamps: true 
});

// Export the Notice model with the defined schema
module.exports = mongoose.model("notice", noticeSchema);
