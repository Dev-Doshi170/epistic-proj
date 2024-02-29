import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import  { useState,useEffect} from 'react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);

  

  const handleLogout = () => {
    // Remove authToken from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenTimestamp');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className={`flex bg-slate-700 flex-col w-[15%] h-screen p-4 `}>
      <div className="">
        {/* Hamburger Icon */}
        
      </div>

      <div className="flex-col gap-4 mt-20 ">
        <div className='my-5  flex gap-2 items-center'>
        {location.pathname === "/country" ? (
          <div>
            <img src='Asset\arrow.png' alt="Black Arrow" />
            <img src='Asset\white arrow.png' alt="White Arrow" className="hidden" />
          </div>
        ) : (
          <div>
            <img src='Asset\blackarrow.png' alt="Black Arrow" className="hidden" />
            <img src='Asset\white arrow.png' alt="White Arrow" />
          </div>
        )}
          <NavLink
            className={`relative text-[26px] font-semibold ${
              location.pathname === "/country" ? "text-black" : "text-white"
            } hover:font-bold `}
            to="/country"
          >
            Country
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100 "></div>
          </NavLink>
        </div>
        <div className='my-5 flex gap-2 items-center'>
          {location.pathname === "/state" ? (
            <div>
              <img src='Asset\arrow.png' alt="Black Arrow" />
              <img src='Asset\white arrow.png' alt="White Arrow" className="hidden" />
            </div>
          ) : (
            <div>
              <img src='Asset\blackarrow.png' alt="Black Arrow" className="hidden" />
              <img src='Asset\white arrow.png' alt="White Arrow" />
            </div>
          )}
          <NavLink
            className={`relative text-[26px] font-semibold ${
              location.pathname === "/state" ? "text-black" : "text-white"
            } hover:font-bold transition-colors duration-300`}
            to="/state"
          >
            State
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
          </NavLink>
        </div>
        <div className='my-5  flex gap-2 items-center'> 
        {location.pathname === "/city" ? (
          <div>
            <img src='Asset\arrow.png' alt="Black Arrow" />
            <img src='Asset\white arrow.png' alt="White Arrow" className="hidden" />
          </div>
        ) : (
          <div>
            <img src='Asset\blackarrow.png' alt="Black Arrow" className="hidden" />
            <img src='Asset\white arrow.png' alt="White Arrow" />
          </div>
        )}
          <NavLink
            className={`relative text-[26px] font-semibold ${
              location.pathname === "/city" ? "text-black" : "text-white"
            } hover:font-bold transition-colors duration-300`}
            to="/city"
          >
            City
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
          </NavLink>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="mt-auto flex gap-2">
      <img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogout}
        src={isHovered ? 'Asset/logout black.png' : 'Asset/logout white.png'}
        alt={isHovered ? 'Black Logout' : 'White Logout'}
        className="logo cursor-pointer"
      />
      <button
        className={`text-2xl font-extrabold ${isHovered ? 'text-black' : 'text-white'} hover:text-black`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
    </div>
  );
};

export default Sidebar;
