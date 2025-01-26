
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import Cookies from 'js-cookie';
const Header = () => {
  const Navigate = useNavigate()

  const handleLogOut = () => {
    Cookies.remove("userRole");
    Cookies.remove("userToken");
    Cookies.remove("userName")
    Navigate("/");
  };
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Food Manangement system</h1>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-user">Add User</Link>
            </li>
            <li>
              <Link to="/reports">Download Reports</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <button onClick={handleLogOut} >logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


