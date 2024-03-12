const {getAll, getById,updateById, deleteById,create}
 = require('./students.service'); 


const getAllStudent = async (req, res) => {
    try {
        const allStudent = await getAll();
        res.json(allStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};



const getStudentById = async (req, res) => {
    try {
        const Student = await getById(req.params.id);
        if (!Student) {
            return res.status(404)
            .json({ message: 'Student not found' });
        }
        res.json(Student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


const updateStudentById = async (req, res) => {
    try {
        const updatedStudent = await updateById(req.params.id, req.body);
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

    
const deleteStudentById = async (req, res) => {
    try {
        const deletedStudent = await deleteById(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(deletedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};


    const CreateStudent = async (req, res) => {
        try {
            console.log('rrr',req.body);
          const { Student } = await create(req.body);
          res.json({ Student });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      


module.exports = { getAllStudent,getStudentById
             ,updateStudentById,deleteStudentById,CreateStudent
};
