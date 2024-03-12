import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');


    // Redirect to home page after logout
    navigate('/');
  };

  const user = localStorage.getItem('user');

  return (
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
          <Link to="/">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
