const Teacher = require('./teacher.model'); 

const getAll = async () => {         // Get all Teachers
    try {
        const teachers = await Teacher.find({});
        return teachers;
    } catch (error) {
        throw error;
    }
};
const getById = async (id) => {  // Get Teacher
    try {
        const teacher = await Teacher.findById(id);
        return teacher;
    } catch (error) {
        throw error;
    }
};
const updateById = async (id, newData) => {   // Update Teacher by ID
    try {
        const updatedTeacher = 
        await Teacher.findByIdAndUpdate(id, newData, { new: true });
        return updatedTeacher;
    } catch (error) {
        throw error;
    }
};
const deleteById = async (id) => {  // Delete Teacher by ID
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        return deletedTeacher;
    } catch (error) {
        throw error;
    }
};
const create = async (data) => {
    try {
        console.log(data);
      const newTeacher = new Teacher(data);
      const savedTeacher = await newTeacher.save();
      return { Teacher: savedTeacher};
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
