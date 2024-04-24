// Import the Express router
const router = require('express').Router();

// Import controllers for various functionalities
const { 
  adminRegister, 
  adminLogIn, 
  getAdminDetail 
} = require('../controllers/adminController.js');

const { 
  sclassCreate, 
  sclassList, 
  deleteSclass, 
  deleteSclasses, 
  getSclassDetail, 
  getSclassStudents 
} = require('../controllers/classController.js');

const { 
  complainCreate, 
  complainList 
} = require('../controllers/complainController.js');

const { 
  noticeCreate, 
  noticeList, 
  deleteNotices, 
  deleteNotice, 
  updateNotice 
} = require('../controllers/noticeController.js');

const { 
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
  removeStudentAttendance 
} = require('../controllers/studentController.js');

const { 
  subjectCreate, 
  classSubjects, 
  deleteSubjectsByClass, 
  getSubjectDetail, 
  deleteSubject, 
  freeSubjectList, 
  allSubjects, 
  deleteSubjects 
} = require('../controllers/subjectController.js');

const { 
  teacherRegister, 
  teacherLogIn, 
  getTeachers, 
  getTeacherDetail, 
  deleteTeachers, 
  deleteTeachersByClass, 
  deleteTeacher, 
  updateTeacherSubject, 
  teacherAttendance 
} = require('../controllers/teacherController.js');

// Admin routes
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);

// Sclass routes
router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

// Subject routes
router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

// Export the router for use in other files
//asdf
module.exports = router;
