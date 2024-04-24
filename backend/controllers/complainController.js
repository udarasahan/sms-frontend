// Import necessary model
const Complain = require('../models/complainSchema.js');

// Function to create a new complaint
const complainCreate = async (req, res) => {
    try {
        // Create a new Complain instance with the data from the request body
        const complain = new Complain(req.body);

        // Save the new complaint and send the result as a response
        const result = await complain.save();
        res.send(result);
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to get a list of complaints associated with a school
const complainList = async (req, res) => {
    try {
        // Find all complaints associated with the provided school ID and populate the 'user' field with 'name'
        let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        if (complains.length > 0) {
            res.send(complains);
        } else {
            // If no complaints are found, send a message
            res.send({ message: "No complaints found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Export the functions for use in other files
module.exports = { complainCreate, complainList };
