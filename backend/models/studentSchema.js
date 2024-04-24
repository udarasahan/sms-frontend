// Import the mongoose library
const mongoose = require('mongoose');

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    // Name of the student
    name: {
        type: String,
        required: true
    },
    // Roll number of the student
    rollNum: {
        type: Number,
        required: true
    },
    // Password for the student
    password: {
        type: String,
        required: true
    },
    // Class associated with the student (reference to the 'sclass' model)
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass', // Reference to the 'sclass' model
        required: true,
    },
    // School associated with the student (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
        required: true,
    },
    // Role of the student (default is "Student")
    role: {
        type: String,
        default: "Student"
    },
    // Array to store exam results
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject', // Reference to the 'subject' model
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    // Array to store attendance details
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject', // Reference to the 'subject' model
            required: true
        }
    }]
});

// Export the Student model with the defined schema
module.exports = mongoose.model("student", studentSchema);
