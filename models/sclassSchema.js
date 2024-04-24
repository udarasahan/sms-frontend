// Import the mongoose library
const mongoose = require("mongoose");

// Define the Sclass Schema
const sclassSchema = new mongoose.Schema({
    // Name or identifier for the class
    sclassName: {
        type: String,
        required: true,
    },
    // School associated with the class (reference to the 'admin' model)
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Reference to the 'admin' model
    },
}, { 
    // Enable timestamps to automatically manage 'createdAt' and 'updatedAt' fields
    timestamps: true 
});

// Export the Sclass model with the defined schema
module.exports = mongoose.model("sclass", sclassSchema);
