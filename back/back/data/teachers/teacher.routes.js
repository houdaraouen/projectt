const express = require("express");
const router = express.Router();

const {
    getAllTeachers,getTeacherById
    ,updateTeacherById,deleteTeacherById,CreateTeacher
} = require("./teacher.controller");



router.post("/", CreateTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacherById);
router.delete("/:id", deleteTeacherById);

module.exports = router;
