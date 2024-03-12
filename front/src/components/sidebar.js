import React from "react";
import { Link } from "react-router-dom";
import './sideBar.css';

const Sidebar = () => {
  return (
    <div className="container">
      <Link to="/teachers" className="box">
        <h1>Teachers</h1>
      </Link>
      <Link to="/students" className="box">
        <h2>Students</h2>
      </Link>
      <Link to="/courses" className="box">
        <h3>Courses</h3>
      </Link>
    </div>
  );
};

export default Sidebar;
