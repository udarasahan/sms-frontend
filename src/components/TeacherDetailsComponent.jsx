import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherDetailsComponent = () => {
  const location = useLocation();
  const teacherData = location.state || {};
  const [students, setStudents] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [token, setToken] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (teacherData.teachSclass && teacherData.teachSclass._id) {
          const response = await axios.get(`http://localhost:5000/Sclass/Students/${teacherData.teachSclass._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const studentsWithAttendance = response.data.map(student => ({
            ...student,
            status: 'absent' // default status
          }));
          setStudents(studentsWithAttendance);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (teacherData.teachSclass && teacherData.teachSclass._id) {
      fetchStudents();
    }
  }, [teacherData.teachSclass, token]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: status
    });
  };

  const submitAttendance = async () => {
    try {
      if (!teacherData || !teacherData.teachSclass || !teacherData.teachSclass._id) {
        setErrorMsg('Teacher data is missing or incomplete.');
        return;
      }

      const date = new Date().toISOString();

      for (const student of students) {
        const studentAttendance = attendanceData[student._id] || 'Absent';
        await axios.put(`http://localhost:5000/studentAttendance/${student._id}`, {
          subName: teacherData?.teachSubject?._id,
          status: studentAttendance,
          date: date
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setSuccessMsg('Attendance successfully updated.');
    } catch (error) {
      console.error('Error updating attendance:', error);
      setErrorMsg('An error occurred while updating attendance.');
    }
  };
  
  return (
    <div className="container px-4 mx-auto mt-8 mb-24 overflow-y-auto ">
      <h3 className='mt-10 mb-2 text-xl font-semibold text-black'>Subject : {teacherData.teachSubject && teacherData.teachSubject.subName} </h3>
      <h3 className='mt-2 mb-2 text-xl font-semibold'>Class : {teacherData.teachSclass && teacherData.teachSclass.sclassName} </h3>
      <h3 className="mt-2 mb-4 text-xl font-semibold">Students List</h3>
      {successMsg && <div className="p-4 mt-4 text-green-600 rounded bg-slate-200">{successMsg}</div>}
      {errorMsg && <div className="p-4 mt-4 text-red-700 bg-red-100 rounded">{errorMsg}</div>}
      <div className="overflow-x-auto">
        <form onSubmit={(e) => {
          e.preventDefault();
          submitAttendance();
        }}>
          <div className="overflow-auto">
            <table className="w-full border border-collapse border-gray-400">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-400">Student Number</th>
                  <th className="px-4 py-2 border border-gray-400">Name</th>
                  <th className="px-4 py-2 border border-gray-400">Attendance</th>
                </tr>
              </thead>
              <tbody className='overflow-auto '>
                {students.map(student => (
                  <tr key={student._id} className="border-b border-gray-400">
                    <td className="px-4 py-2 border border-gray-400">{student.rollNum}</td>
                    <td className="px-4 py-2 border border-gray-400">{student.name}</td>
                    <td className="px-4 py-2 border border-gray-400">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`attendance-${student._id}`}
                          value="Present"
                          checked={attendanceData[student._id] === 'Present'}
                          onChange={() => handleAttendanceChange(student._id, 'Present')}
                          className="w-5 h-4 m-2 text-indigo-600 transition duration-150 ease-in-out form-radio"
                        /> Present
                      </label>
                      <label className="inline-flex items-center ml-2">
                        <input
                          type="radio"
                          name={`attendance-${student._id}`}
                          value="Absent"
                          checked={attendanceData[student._id] === 'Absent'}
                          onChange={() => handleAttendanceChange(student._id, 'Absent')}
                          className="w-5 h-4 mr-2 text-red-600 transition duration-150 ease-in-out form-radio"
                        /> Absent
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='justify-center text-center '>
          <button type="submit" className="px-4 py-2 m-5 border mt-4text-white rounded-2xl bg-slate-400 hover:bg-slate-800 hover:text-white">Submit Attendance</button>
          </div>
          <div className='justify-center text-center '> 
          <button className="px-6 py-2 font-bold text-white rounded-2xl bg-slate-400 hover:bg-slate-700">
            <a href='/'>Logout</a>
         </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherDetailsComponent;
