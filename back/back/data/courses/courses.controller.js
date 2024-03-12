const {getAll, getById,updateById, deleteById,create}
 = require('./courses.service'); 


const getAllCourses = async (req, res) => {
    try {
        const allCourses = await getAll();
        res.json(allCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};



const getCoursesById = async (req, res) => {
    try {
        const Courses = await getById(req.params.id);
        if (!Courses) {
            return res.status(404)
            .json({ message: 'Courses not found' });
        }
        res.json(Courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


const updateCoursesById = async (req, res) => {
    try {
        const updatedCourses = await updateById(req.params.id, req.body);
        if (!updatedCourses) {
            return res.status(404).json({ message: 'Courses not found' });
        }
        res.json(updatedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

    
const deleteCoursesById = async (req, res) => {
    try {
        const deletedCourses = await deleteById(req.params.id);
        if (!deletedCourses) {
            return res.status(404).json({ message: 'Courses not found' });
        }
        res.json(deletedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


    const CreateCourses = async (req, res) => {
        try {
          const { Courses } = await create(req.body);
          res.json({ Courses });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      


module.exports = { getAllCourses,getCoursesById
             ,updateCoursesById,deleteCoursesById,CreateCourses
};
