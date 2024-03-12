const Courses = require('./courses.model'); 

const getAll = async () => {         // Get all Coursess
    try {
        const coursess = await Courses.find({});
        return coursess;
    } catch (error) {
        throw error;
    }
};
const getById = async (id) => {  // Get Courses
    try {
        const courses = await Courses.findById(id);
        return courses;
    } catch (error) {
        throw error;
    }
};
const updateById = async (id, newData) => {   // Update Courses by ID
    try {
        const updatedCourses = 
        await Courses.findByIdAndUpdate(id, newData, { new: true });
        return updatedCourses;
    } catch (error) {
        throw error;
    }
};
const deleteById = async (id) => {  // Delete Courses by ID
    try {
        const deletedCourses = await Courses.findByIdAndDelete(id);
        return deletedCourses;
    } catch (error) {
        throw error;
    }
};
const create = async (data) => {
    try {
      const newCourses = new Courses(data);
      const savedCourses = await newCourses.save();
      return { Courses: savedCourses};
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
