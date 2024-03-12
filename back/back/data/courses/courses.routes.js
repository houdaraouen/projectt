const express = require("express");
const router = express.Router();

const {
    getAllCourses,getCoursesById
             ,updateCoursesById,deleteCoursesById,CreateCourses
} = require("./courses.controller");



router.post("/", CreateCourses);
router.get("/", getAllCourses);
router.get("/:id", getCoursesById);
router.put("/:id", updateCoursesById);
router.delete("/:id", deleteCoursesById);

module.exports = router;
