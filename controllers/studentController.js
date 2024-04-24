const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

// Function to register a new student
const studentRegister = async (req, res) => {
    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Check if the student with the same roll number, school, and class already exists
        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        }
        else {
            // Create a new student with hashed password
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            // Save the student and send the result (excluding password)
            let result = await student.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to handle student login
const studentLogIn = async (req, res) => {
    try {
        // Find the student by roll number and name
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            // Validate the password using bcrypt
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                // Populate additional data, exclude sensitive information, and send the result
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to get all students in a school
const getStudents = async (req, res) => {
    try {
        // Find students by school ID and populate class information
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            // Modify the response to exclude passwords
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to get details of a specific student
const getStudentDetail = async (req, res) => {
    try {
        // Find student by ID and populate various information
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            // Exclude the password and send the result
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Function to delete a specific student
const deleteStudent = async (req, res) => {
    try {
        // Find and delete the student by ID
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
};

// Function to delete all students in a school
const deleteStudents = async (req, res) => {
    try {
        // Delete all students by school ID and send the result
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
};

// Function to delete all students in a specific class
const deleteStudentsByClass = async (req, res) => {
    try {
        // Delete all students by class ID and send the result
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
};

// Function to update student information
const updateStudent = async (req, res) => {
    try {
        // If a new password is provided, hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        // Update the student information and send the result (excluding password)
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to update exam result for a student
const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        // Find the student by ID
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        // Check if the result for the subject already exists, update if it does, otherwise add a new result
        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        // Save the student and send the result
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to handle student attendance
const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        // Find the student by ID
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        // Find the subject by ID
        const subject = await Subject.findById(subName);

        // Check if the attendance for the date and subject already exists, update if it does, otherwise add a new attendance record
        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({ date, status, subName });
        }

        // Save the student and send the result
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to clear all students' attendance for a specific subject
const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        // Update all students to remove attendance records for the specified subject
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to clear all students' attendance in a school
const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id

    try {
        // Update all students to remove all attendance records
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to remove a specific student's attendance for a subject
const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        // Update the specific student to remove attendance records for the specified subject
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Function to remove all attendance records for a specific student
const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        // Update the specific student to remove all attendance records
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Export all functions
module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,

    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
};
