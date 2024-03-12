import React from 'react';
import { Route, Routes ,Navigate } from 'react-router-dom';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import Teachers from './page/admin/Teachers';
import Courses from './page/admin/courses';
import Students from './page/admin/Students';
import Service from './page/Service';
import About from './page/About';
import Contact from './page/Contact';
import Admin from './page/admin/admin';



function App() {


  const PrivateRoute = ({ children}) => {
    const hasToken = !!localStorage.getItem('token');
    
  
    return (
      hasToken  ? children : <Navigate to='/login'  />
    )
 }


 const AuthRoute = ({ children}) => {
  const hasToken = !!localStorage.getItem('token');
  return (
    hasToken === false ? children : <Navigate to='/'  />
  )
}

  return (
    <>

     

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signup" element={<AuthRoute><Signup/></AuthRoute>} />
        <Route path="/login" element={<AuthRoute><Login/></AuthRoute>} />
        <Route  path="/teachers" element={<PrivateRoute><Teachers/></PrivateRoute>} />
        <Route  path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses/></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Students/></PrivateRoute>} />
        <Route path='/service' element={<Service/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/service' element={<Contact/>}/>
        <Route path='/*' element={<Home/>}/>
      </Routes>
      </>
  );
}

export default App;
