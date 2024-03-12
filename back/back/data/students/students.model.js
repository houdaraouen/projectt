const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  FirstName: String,
  LastName :String,
  phone:String

 
});
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
