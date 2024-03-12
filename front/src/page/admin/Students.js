import React, { useState, useEffect } from "react";
import axios from "axios";
import './student.css';  // Update the CSS file if needed
import AdminLayout from "./adminLayout";

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    FirstName: "",
    LastName: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editForm, setEditForm] = useState({
    FirstName: "",
    LastName: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch the list of students from the API
    axios.get("http://localhost:3001/student")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  });  // Empty dependency array to fetch data only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const addStudent = () => {
    // Send a POST request to add a new student
    axios.post("http://localhost:3001/student", newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setNewStudent({ FirstName: "", LastName: "", phone: "" });
      })
      .catch(error => console.error("Error adding student:", error));
  };

  const editStudent = (studentId) => {
    const selectedStudent = students.find(student => student._id === studentId);
    setEditForm({ ...selectedStudent });
    setEditMode(true);
    setEditStudentId(studentId);
  };

  const updateStudent = () => {
    // Send a PUT request to update the student
    axios.put(`http://localhost:3001/student/${editStudentId}`, editForm)
      .then(response => {
        setStudents(students.map(student => (student._id === editStudentId ? response.data : student)));
        setEditMode(false);
        setEditStudentId(null);
        setEditForm({ FirstName: "", LastName: "", phone: "" }); // Reset edit form after update
      })
      .catch(error => console.error("Error updating student:", error));
  };

  const deleteStudent = (studentId) => {
    // Send a DELETE request to remove a student
    axios.delete(`http://localhost:3001/student/${studentId}`)
      .then(() => setStudents(students.filter(student => student._id !== studentId)))
      .catch(error => console.error("Error deleting student:", error));
  };

  return (
    <AdminLayout>
      <div className="main">
        <div className="add-form">
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            value={newStudent.FirstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            value={newStudent.LastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newStudent.phone}
            onChange={handleInputChange}
          />
          <button type="button" onClick={addStudent}>
            Add Student
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <button className="delete" onClick={() => deleteStudent(student._id)}>
                      Delete
                    </button>
                    <button onClick={() => editStudent(student._id)}>Edit</button>
                  </td>
                  <td>{editMode && editStudentId === student._id ? (
                    <input
                      type="text"
                      name="FirstName"
                      value={editForm.FirstName}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    student.FirstName
                  )}</td>
                  <td>{editMode && editStudentId === student._id ? (
                    <input
                      type="text"
                      name="LastName"
                      value={editForm.LastName}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    student.LastName
                  )}</td>
                  <td>{editMode && editStudentId === student._id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    student.phone
                  )}</td>
                  {editMode && editStudentId === student._id && (
                    <td>
                      <button type="button" onClick={updateStudent}>Update</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Students;
