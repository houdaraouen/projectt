const express = require("express");
const router = express.Router();

const {
    getAllStudent,getStudentById
             ,updateStudentById,deleteStudentById,CreateStudent
} = require("./students.controller");



router.post("/", CreateStudent);
router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentById);
router.delete("/:id", deleteStudentById);

module.exports = router;
