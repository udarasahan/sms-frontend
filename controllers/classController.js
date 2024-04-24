// Import necessary models
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');

// Function to create a new class
const sclassCreate = async (req, res) => {
    try {
        // Create a new Sclass instance with the data from the request body
        const sclass = new Sclass({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        // Check if a class with the same name and associated school already exists
        const existingSclassByName = await Sclass.findOne({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        if (existingSclassByName) {
            // If a class with the same name exists, send a message
            res.send({ message: 'Sorry, this class name already exists' });
        }
        else {
            // Save the new class and send the result as a response
            const result = await sclass.save();
            res.send(result);
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to get a list of classes associated with a school
const sclassList = async (req, res) => {
    try {
        // Find all classes associated with the provided school ID
        let sclasses = await Sclass.find({ school: req.params.id });
        if (sclasses.length > 0) {
            res.send(sclasses);
        } else {
            // If no classes are found, send a message
            res.send({ message: "No classes found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Function to get details of a specific class by ID
const getSclassDetail = async (req, res) => {
    try {
        // Find a class by ID and populate the 'school' field with 'schoolName'
        let sclass = await Sclass.findById(req.params.id).populate("school", "schoolName");
        if (sclass) {
            res.send(sclass);
        }
        else {
            // If no class is found, send a message
            res.send({ message: "No class found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
}

// Function to get students associated with a specific class
const getSclassStudents = async (req, res) => {
    try {
        // Find students with the provided class name
        let students = await Student.find({ sclassName: req.params.id });
        if (students.length > 0) {
            // Exclude the 'password' field from the response
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            // If no students are found, send a message
            res.send({ message: "No students found" });
        }
    } catch (err) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(err);
    }
}

// Function to delete a specific class and associated data
const deleteSclass = async (req, res) => {
    try {
        // Delete the class by ID
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }

        // Delete students, subjects, and teachers associated with the class
        const deletedStudents = await Student.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });

        // Send the deleted class as a response
        res.send(deletedClass);
    } catch (error) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(error);
    }
}

// Function to delete all classes associated with a specific school
const deleteSclasses = async (req, res) => {
    try {
        // Delete all classes associated with the provided school ID
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }

        // Delete students, subjects, and teachers associated with the school
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });

        // Send the deleted classes as a response
        res.send(deletedClasses);
    } catch (error) {
        // Handle errors and send a 500 status code with the error details
        res.status(500).json(error);
    }
}

// Export the functions for use in other files
module.exports = { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents };
