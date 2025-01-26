import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Header/Header.css'; 
import Cookies from 'js-cookie';

const CityManagerHeader = () => {
  const Navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("userRole");
    Cookies.remove("userToken");
    Cookies.remove("userName");
    Navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Food Management System</h1>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/citystats">Stats</Link>
            </li>
            <li>
              <Link to="/cityManagers">Branch Manager</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CityManagerHeader;
