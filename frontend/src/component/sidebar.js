import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = () => {
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
    <div className="flex flex-col bg-slate-600 w-[15%] h-screen p-4  ">
      <div className="">
        {/* Hamburger Icon */}
        
      </div>

      <div className="flex-col gap-4 mt-20 ">
        <div className='my-5'>
          <NavLink
            className={`relative text-3xl font-extrabold ${
              location.pathname === "/country" ? "text-black" : "text-emerald-400"
            } hover:text-black transition-colors duration-300`}
            to="/country"
          >
            Country
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100 "></div>
          </NavLink>
        </div>
        <div className='my-5'>
          <NavLink
            className={`relative text-3xl font-extrabold ${
              location.pathname === "/state" ? "text-black" : "text-emerald-400"
            } hover:text-black transition-colors duration-300`}
            to="/state"
          >
            State
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
          </NavLink>
        </div>
        <div className='my-5'> 
          <NavLink
            className={`relative text-3xl font-extrabold ${
              location.pathname === "/city" ? "text-black" : "text-emerald-400"
            } hover:text-black transition-colors duration-300`}
            to="/city"
          >
            City
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
          </NavLink>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="mt-auto">
        <button
          className="text-3xl font-extrabold text-white hover:text-emerald-400 transition-colors duration-300 "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
