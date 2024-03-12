import React, { useState, useEffect } from "react";
import axios from "axios";
import './Teachers.css';
import AdminLayout from "./adminLayout";

function Teachers() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    Name: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editForm, setEditForm] = useState({
    Name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the list of courses from the API
    axios.get("http://localhost:3001/course")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const addCourse = () => {
    // Send a POST request to add a new course
    axios.post("http://localhost:3001/course", newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setNewCourse({ Name: "", description: "" });
      })
      .catch(error => console.error("Error adding course:", error));
  };

  const editCourse = (courseId) => {
    const selectedCourse = courses.find(course => course._id === courseId);
    setEditForm({ ...selectedCourse });
    setEditMode(true);
    setEditCourseId(courseId);
  };

  const updateCourse = () => {
    // Send a PUT request to update the course
    axios.put(`http://localhost:3001/course/${editCourseId}`, editForm)
      .then(response => {
        setCourses(courses.map(course => (course._id === editCourseId ? response.data : course)));
        setEditMode(false);
        setEditCourseId(null);
        setEditForm({ Name: "", description: "" }); // Reset edit form after update
      })
      .catch(error => console.error("Error updating course:", error));
  };

  const deleteCourse = (courseId) => {
    // Send a DELETE request to remove a course
    axios.delete(`http://localhost:3001/course/${courseId}`)
      .then(() => setCourses(courses.filter(course => course._id !== courseId)))
      .catch(error => console.error("Error deleting course:", error));
  };

  return (
    <AdminLayout>
      <div className="main">
        <div className="add-form">
          <input
            type="text"
            name="Name"
            placeholder="Course Name"
            value={newCourse.Name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleInputChange}
          />
          <button type="button" onClick={addCourse}>
            Add Course
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Course Name</th>
                <th>Course Description</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>
                    <button className="delete" onClick={() => deleteCourse(course._id)}>
                      Delete
                    </button>
                    <button onClick={() => editCourse(course._id)}>Edit</button>
                    {/* Add a profile button functionality here */}
                  </td>
                  <td>{editMode && editCourseId === course._id ? (
                    <input
                      type="text"
                      name="Name"
                      value={editForm.Name}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    course.Name
                  )}</td>
                  <td>{editMode && editCourseId === course._id ? (
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditInputChange}
                    />
                  ) : (
                    course.description
                  )}</td>
                  {editMode && editCourseId === course._id && (
                    <td>
                      <button type="button" onClick={updateCourse}>Update</button>
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
