import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const handleSignup = async (event) => {
    event.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/user/register", {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
      });

      console.log("User registered successfully", response.data);
      navigate("/");
      // Clear the form after successful registration
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // You may redirect the user or perform other actions after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, etc.
    }
  };

  return (
    <div className='mainn'>
      <h2>Signup</h2>
      <div className='formm'>
        <input
          type="text"
          placeholder="First Name"
          value={signupData.firstName}
          onChange={(event) => setSignupData({ ...signupData, firstName: event.target.value })}
        /><br/>

        <input
          type="text"
          placeholder="Last Name"
          value={signupData.lastName}
          onChange={(event) => setSignupData({ ...signupData, lastName: event.target.value })}
        /><br/>

        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(event) => setSignupData({ ...signupData, email: event.target.value })}
        /> <br/>

        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
        /><br/>

        <input
          type="password"
          placeholder="Confirm Password"
          value={signupData.confirmPassword}
          onChange={(event) => setSignupData({ ...signupData, confirmPassword: event.target.value })}
        /><br/>

        <button type="submit" onClick={handleSignup} className='btnn'>Sign Up</button>
      </div>
    </div>
  );
}

export default Signup;
