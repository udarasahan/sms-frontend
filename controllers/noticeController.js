// Import necessary model
const Notice = require('../models/noticeSchema.js');

// Function to create a new notice
const noticeCreate = async (req, res) => {
    try {
        // Create a new Notice instance with the data from the request body
        const notice = new Notice({
            ...req.body,
            school: req.body.adminID
        });

        // Save the new notice and send the result as a response
        const result = await notice.save();
        res.send(result);
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to get a list of notices associated with a school
const noticeList = async (req, res) => {
    try {
        // Find all notices associated with the provided school ID
        let notices = await Notice.find({ school: req.params.id });
        if (notices.length > 0) {
            res.send(notices);
        } else {
            // If no notices are found, send a message
            res.send({ message: "No notices found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to update a specific notice by ID
const updateNotice = async (req, res) => {
    try {
        // Find and update the notice by ID, then send the updated result as a response
        const result = await Notice.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.send(result);
    } catch (error) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(error);
    }
};

// Function to delete a specific notice by ID
const deleteNotice = async (req, res) => {
    try {
        // Find and delete the notice by ID, then send the deleted result as a response
        const result = await Notice.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(error);
    }
};

// Function to delete all notices associated with a specific school
const deleteNotices = async (req, res) => {
    try {
        // Delete all notices associated with the provided school ID
        const result = await Notice.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No notices found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(error);
    }
};

// Export the functions for use in other files
module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };
