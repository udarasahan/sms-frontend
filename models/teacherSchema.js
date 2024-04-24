// Import the mongoose library
const mongoose = require("mongoose");

// Define the Teacher Schema
const teacherSchema = new mongoose.Schema({
    // Name of the teacher
    name: {
        type: String,
        required: true,
    },
    // Email of the teacher (should be unique)
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // Password for the teacher
    password: {
        type: String,
        required: true,
    },
    // Role of the teacher (default is "Teacher")
    role: {
        type: String,
        default: "Teacher"
    },
    // School associated with the teacher (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
        required: true,
    },
    // Subject taught by the teacher (reference to the 'subject' model)
    teachSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject', // Reference to the 'subject' model
    },
    // Class taught by the teacher (reference to the 'sclass' model)
    teachSclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass', // Reference to the 'sclass' model
        required: true,
    },
    // Array to store attendance details
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
}, { 
    // Enable timestamps to automatically manage 'createdAt' and 'updatedAt' fields
    timestamps: true 
});

// Export the Teacher model with the defined schema
module.exports = mongoose.model("teacher", teacherSchema);
