const {getAll, getById,updateById, deleteById,create}
 = require('./teacher.service'); 


const getAllTeachers = async (req, res) => {
    try {
        const allTeachers = await getAll();
        res.json(allTeachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};



const getTeacherById = async (req, res) => {
    try {
        const Teacher = await getById(req.params.id);
        if (!Teacher) {
            return res.status(404)
            .json({ message: 'Teacher not found' });
        }
        res.json(Teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


const updateTeacherById = async (req, res) => {
    try {
        const updatedTeacher = await updateById(req.params.id, req.body);
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

    
const deleteTeacherById = async (req, res) => {
    try {
        const deletedTeacher = await deleteById(req.params.id);
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(deletedTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


    const CreateTeacher = async (req, res) => {
        try {
            console.log(req.body);
          const { Teacher } = await create(req.body);
          res.json({ Teacher });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      


module.exports = { getAllTeachers,getTeacherById
             ,updateTeacherById,deleteTeacherById,CreateTeacher
};
