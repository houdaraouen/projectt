require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors module
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined in .env

app.use(cookieParser());
app.use(cors()); // Use cors middleware

const userRoutes = require('./data/users/user.routes');
const teachersRoutes = require ('./data/teachers/teacher.routes')
const courseRoutes = require ('./data/courses/courses.routes')
const StudentRoutes =require ('./data/students/students.routes')

app.use(express.json());
app.use('/user', userRoutes);
app.use('/teacher', teachersRoutes)
app.use ('/course', courseRoutes)
app.use ('/student', StudentRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
