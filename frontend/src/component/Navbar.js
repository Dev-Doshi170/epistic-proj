import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authToken from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenTimestamp');
    
    // Redirect to the login page
    navigate('/');
  };
  return (
    <div>
    <button
    className="  text-3xl font-extrabold text-white hover:text-emerald-400 transition-colors duration-300 "
    onClick={handleLogout}
  >
    Logout
  </button>
    </div>
  )
}

export default Navbar