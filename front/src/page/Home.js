import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {

  const handleLogout = () => {
    // Clear user data from local storage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');


    // Redirect to home page after logout
    navigate('/');
  };
  const user = localStorage.getItem('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token and user details in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', user.firstName);
      localStorage.setItem('userId', user._id);

      console.log('User logged in:', user);

      // Redirect to a different page after successful login
      navigate('/teachers'); // Replace '/dashboard' with the desired redirect path
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, show a message to the user, etc.
    }
  };

  return (
    <div>
      <div className='main'>
      <div className='navbar'>
      <div className='icon'>
        <h2 className='logo'>GoMyCode</h2>
      </div>
      <div className='menu'>
        <ul className='home-ul'>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/About">ABOUT</Link></li>
          <li><Link to="/Contact">CONTACT</Link></li>
          <li><Link to="/Service">SERVICE</Link></li>
        </ul>
      </div>
      <div className='user-section'>
        {user ? (
          <>
            <p>Welcome, {user}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>



          <div className='content'>
            <h1>WE ARE BEST LEARN IN THE TEACHER</h1>
            <h5 className='par'>
              An educational application that provides interactive exercises in all basic subjects for the primary
              stage, completely identical to the official ministerial programmes.
            </h5>

          </div>
        </div>
    
    </div>
  );
};

export default Home;
