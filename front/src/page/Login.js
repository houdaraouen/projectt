import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import axios from 'axios';


function Login() {
 
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
      navigate('/admin'); // Replace '/dashboard' with the desired redirect path
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, show a message to the user, etc.
    }
  };


  return (
    <div>
  
  <div className='form'>
              <h2>Login Here</h2>
              <input
                type='email'
                name='email'
                placeholder='Enter Your Email Here'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type='password'
                name='password'
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='btnn' onClick={handleLogin}>
                Login
              </button>
              <p className='link'>
                Don't have you an account?
                <br />
                <Link to='signup'>Sign up</Link> here
              </p>
              <p className='liw'>Log in with</p>
              <div className="social">
                <Link to="https://www.facebook.com"><FaFacebook /></Link>
                <Link to="https://www.google.com"><FaGoogle /></Link>
                <Link to="https://www.instagram.com"><FaInstagram /></Link>
                <Link to="https://www.twitter.com"><FaTwitter /></Link>
              </div>
            </div>
    </div>
  );
}

export default Login;