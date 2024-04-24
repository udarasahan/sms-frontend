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

// Student routes
router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get("/Students/:id", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

// Teacher routes
router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);
router.get("/Teachers/:id", getTeachers);
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);

// Notice routes
router.post('/NoticeCreate', noticeCreate);
router.get('/NoticeList/:id', noticeList);
router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

// Complain routes
router.post('/ComplainCreate', complainCreate);
router.get('/ComplainList/:id', complainList);

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
module.exports = router;
