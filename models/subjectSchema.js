// Import the mongoose library
const mongoose = require("mongoose");

// Define the Subject Schema
const subjectSchema = new mongoose.Schema({
    // Name or title of the subject
    subName: {
        type: String,
        required: true,
    },
    // Code or identifier for the subject
    subCode: {
        type: String,
        required: true,
    },
    // Number of sessions for the subject
    sessions: {
        type: String,
        required: true,
    },
    // Class associated with the subject (reference to the 'sclass' model)
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass', // Reference to the 'sclass' model
        required: true,
    },
    // School associated with the subject (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
    },
    // Teacher associated with the subject (reference to the 'teacher' model)
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', // Reference to the 'teacher' model
    }
}, { 
    // Enable timestamps to automatically manage 'createdAt' and 'updatedAt' fields
    timestamps: true 
});

// Export the Subject model with the defined schema
module.exports = mongoose.model("subject", subjectSchema);
