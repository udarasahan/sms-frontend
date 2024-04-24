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



// Export the router for use in other files
module.exports = router;
