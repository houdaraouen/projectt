const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
  fullName: String,
  diplome :String,
  phone:String,
  email:String
});
const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
