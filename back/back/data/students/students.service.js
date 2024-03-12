const Student = require('./students.model'); 

const getAll = async () => {         // Get all Students
    try {
        const students = await Student.find({});
        return students;
    } catch (error) {
        throw error;
    }
};
const getById = async (id) => {  // Get Student
    try {
        const student = await Student.findById(id);
        return student;
    } catch (error) {
        throw error;
    }
};
const updateById = async (id, newData) => {   // Update Student by ID
    try {
        const updatedStudent = 
        await Student.findByIdAndUpdate(id, newData, { new: true });
        return updatedStudent;
    } catch (error) {
        throw error;
    }
};
const deleteById = async (id) => {  // Delete Student by ID
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        return deletedStudent;
    } catch (error) {
        throw error;
    }
};
const create = async (data) => {
    try {
      const newStudent = new Student(data);
      const savedStudent = await newStudent.save();
      return { Student: savedStudent};
    } catch (error) {
      throw error;
    }
  };
  
module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};
