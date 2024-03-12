import React, { useState, useEffect } from "react";
import axios from "axios";
import './Teachers.css';
import AdminLayout from "./adminLayout";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    diplome: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    diplome: "",
    email: "",
  });

  useEffect(() => {
    // Fetch the list of teachers from the API
    axios.get("http://localhost:3001/teacher")
      .then(response => setTeachers(response.data))
      .catch(error => console.error("Error fetching teachers:", error));
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const addTeacher = () => {
    // Send a POST request to add a new teacher
    axios.post("http://localhost:3001/teacher", newTeacher)
      .then(response => {
        setTeachers([...teachers, response.data]);
        setNewTeacher({ fullName: "", diplome: "", email: "" });
      })
      .catch(error => console.error("Error adding teacher:", error));
  };

  const editTeacher = (teacherId) => {
    const selectedTeacher = teachers.find(teacher => teacher._id === teacherId);
    setEditForm({ ...selectedTeacher });
    setEditMode(true);
    setEditTeacherId(teacherId);
  };

  const updateTeacher = () => {
    // Send a PUT request to update the teacher
    axios.put(`http://localhost:3001/teacher/${editTeacherId}`, editForm)
      .then(response => {
        setTeachers(teachers.map(teacher => (teacher._id === editTeacherId ? response.data : teacher)));
        setEditMode(false);
        setEditTeacherId(null);
        setEditForm({ fullName: "", diplome: "", email: "" }); // Reset edit form after update
      })
      .catch(error => console.error("Error updating teacher:", error));
  };

  const deleteTeacher = (teacherId) => {
    // Send a DELETE request to remove a teacher
    axios.delete(`http://localhost:3001/teacher/${teacherId}`)
      .then(() => setTeachers(teachers.filter(teacher => teacher._id !== teacherId)))
      .catch(error => console.error("Error deleting teacher:", error));
  };

  return (

    <AdminLayout>
    <div className="main">
      <div className="add-form">
        <input
          type="text"
          name="fullName"
          placeholder="fullName"
          value={newTeacher.fullName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="diplome"
          placeholder="diplome"
          value={newTeacher.diplome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={newTeacher.email}
          onChange={handleInputChange}
        />
        <button type="button" onClick={addTeacher}>
          Add Teacher
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Full Name</th>
              <th>Diplome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>
                  <button className="delete" onClick={() => deleteTeacher(teacher._id)}>
                    Delete
                  </button>
                  <button onClick={() => editTeacher(teacher._id)}>Edit</button>
                  {/* Add a profile button functionality here */}
                </td>
                <td>{editMode && editTeacherId === teacher._id ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editForm.fullName}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  teacher.fullName
                )}</td>
                <td>{editMode && editTeacherId === teacher._id ? (
                  <input
                    type="text"
                    name="diplome"
                    value={editForm.diplome}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  teacher.diplome
                )}</td>
                <td>{editMode && editTeacherId === teacher._id ? (
                  <input
                    type="text"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  teacher.email
                )}</td>
                {editMode && editTeacherId === teacher._id && (
                  <td>
                    <button type="button" onClick={updateTeacher}>Update</button>
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

export default Teachers;
