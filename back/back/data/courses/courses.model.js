const mongoose = require("mongoose");
const CoursesSchema = new mongoose.Schema({
  Name: String,
  description :String,
 
});
const Courses = mongoose.model("Courses", CoursesSchema);
module.exports = Courses;

