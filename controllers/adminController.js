// Import necessary modules
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');

// Function to register a new admin
const adminRegister = async (req, res) => {
    try {
        // Create a new Admin instance with the data from the request body
        const admin = new Admin({
            ...req.body
        });

        // Check if an admin with the same email or school name already exists
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            // If an admin with the same email exists, send a message
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            // If a school with the same name exists, send a message
            res.send({ message: 'School name already exists' });
        }
        else {
            // Save the new admin and send the result (excluding the password) as a response
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to handle admin login
const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        // Find an admin with the provided email
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            // If admin is found, check if the provided password matches the stored password
            if (req.body.password === admin.password) {
                admin.password = undefined; // Exclude the password from the response
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            // If admin is not found, send a message
            res.send({ message: "User not found" });
        }
    } else {
        // If email and password are not provided, send a message
        res.send({ message: "Email and password are required" });
    }
};

// Function to get details of a specific admin by ID
const getAdminDetail = async (req, res) => {
    try {
        // Find an admin by ID
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined; // Exclude the password from the response
            res.send(admin);
        }
        else {
            // If admin is not found, send a message
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
}

// Export the functions for use in other files
module.exports = { adminRegister, adminLogIn, getAdminDetail };
