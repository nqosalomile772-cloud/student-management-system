import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  // If no user is logged in, show minimal navbar
  if (!loggedInUser) {
    return (
      <nav className="navbar">
        <div className="nav-brand">
          <h2>📚 Student Management System</h2>
        </div>
        <div className="nav-links">
          <Link to="/login">🔐 Login</Link>
        </div>
      </nav>
    );
  }

  // Show full navbar when logged in
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>📚 Student Management System</h2>
        <span className="user-badge">Welcome, {loggedInUser.username}</span>
      </div>
      <div className="nav-links">
        <Link to="/welcome">🏠 Home</Link>
        <Link to="/students">📋 Students</Link>
        <Link to="/add">➕ Add Student</Link>
        <Link to="/about">ℹ️ About</Link>
        <button onClick={handleLogout} className="nav-logout-btn">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;