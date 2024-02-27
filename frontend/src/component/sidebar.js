// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <div className='flex flex-col gap-10 bg-slate-800 w-[15%] h-screen items-center justify-center'>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/country' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/country"
//       >
//         Country
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/state' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/state"
//       >
//         State
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/city' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/city"
//       >
//         City
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>

//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/city' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/"
//       >
//        logout
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove authToken from local storage
//     localStorage.removeItem('authToken');
    
//     // Redirect to the login page
//     navigate('/');
//   };

//   return (
//     <div className='flex flex-col gap-10 bg-slate-800 w-[15%] h-screen items-center justify-center'>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/country' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/country"
//       >
//         Country
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/state' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/state"
//       >
//         State
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>
//       <NavLink
//         className={`relative text-3xl font-extrabold ${location.pathname === '/city' ? 'text-black' : 'text-emerald-400'} hover:text-black transition-colors duration-300`}
//         to="/city"
//       >
//         City
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </NavLink>

//       <button
//         className="relative text-3xl font-extrabold text-emerald-400 hover:text-black transition-colors duration-300"
//         onClick={handleLogout}
//       >
//         Logout
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

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
    <div className="flex flex-col gap-10 bg-slate-800 w-[15%] h-screen items-center justify-center">
      <NavLink
        className={`relative text-3xl font-extrabold ${
          location.pathname === "/country" ? "text-black" : "text-emerald-400"
        } hover:text-black transition-colors duration-300`}
        to="/country"
      >
        Country
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
      </NavLink>
      <NavLink
        className={`relative text-3xl font-extrabold ${
          location.pathname === "/state" ? "text-black" : "text-emerald-400"
        } hover:text-black transition-colors duration-300`}
        to="/state"
      >
        State
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
      </NavLink>
      <NavLink
        className={`relative text-3xl font-extrabold ${
          location.pathname === "/city" ? "text-black" : "text-emerald-400"
        } hover:text-black transition-colors duration-300`}
        to="/city"
      >
        City
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
      </NavLink>

      {/* Log Out Button */}
      <button
        className="mt-28 text-3xl font-extrabold text-white hover:text-emerald-400 transition-colors duration-300 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;