// // import React, { useState } from 'react';
// // import { Route, Routes, useLocation } from 'react-router-dom';
// // import Login from './component/login';
// // import State from './component/state';
// // import Country from './component/country';
// // import City from './component/city';
// // import Dashbord from './component/dashbord';
// // import Sidebar from './component/sidebar';
// // import Register from './component/Register';
// // import Navbar from './component/Navbar';
// // import { X } from 'lucide-react'; // Import the X icon

// // function App() {
// //   const location = useLocation();
// //   const isRootUrl = location.pathname === '/';
// //   const isRegisterRoute = location.pathname === '/';
  
// //   const [showSidebar, setShowSidebar] = useState(false);

// //   const toggleSidebar = () => {
// //     setShowSidebar(!showSidebar);
// //   };

// //   // Check if the current route is login or register
// //   const isLoginOrRegister = location.pathname === '/' || location.pathname === '/register';

// //   return (
// //     <div className="bg-sky-100 flex h-screen relative">
// //       {/* Hamburger Icon or Close (X) icon based on sidebar state */}
// //       {!isLoginOrRegister && (
// //         <div className="absolute top-5 left-5 z-50">
// //           <button
// //             className="text-3xl text-black focus:outline-none"
// //             onClick={toggleSidebar}
// //             style={{ zIndex: 1000 }}
// //           >
// //             {showSidebar ? <X size={40} /> : '☰'}
// //           </button>
// //         </div>
// //       )}

// //       {showSidebar && !isLoginOrRegister && <Sidebar />}

// //       <div className="flex-1 flex flex-col justify-center items-center">
// //         {/* Content inside Routes */}
// //         <div>
// //           <Routes>
// //             <Route path="/" element={<LoginCentered />} />
// //             <Route path="/dashbord" element={<Dashbord />} />
// //             <Route path="/country" element={<Country />} />
// //             <Route path="/state" element={<State />} />
// //             <Route path="/city" element={<City />} />
// //             <Route path="/register" element={<RegisterCentered />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const LoginCentered = () => (
// //   <div className="w-full max-w-md">
// //     <Login />
// //   </div>
// // );

// // const RegisterCentered = () => (
// //   <div className="w-full max-w-md">
// //     <Register />
// //   </div>
// // );

// // export default App;

// import React, { useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring'; // Import the necessary components from react-spring
// import Login from './component/login';
// import State from './component/state';
// import Country from './component/country';
// import City from './component/city';
// import Dashbord from './component/dashbord';
// import Sidebar from './component/sidebar';
// import Register from './component/Register';
// import Navbar from './component/Navbar';
// import { X } from 'lucide-react'; // Import the X icon

// function App() {
//   const location = useLocation();
//   const isRootUrl = location.pathname === '/';
//   const isRegisterRoute = location.pathname === '/';

//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   // Check if the current route is login or register
//   const isLoginOrRegister = location.pathname === '/' || location.pathname === '/register';

//   // React Spring useSpring hook to animate the sidebar
//   const sidebarAnimation = useSpring({
//     width: showSidebar ? 250 : 0, // Adjust the width as needed
//     opacity: showSidebar ? 1 : 0,
//   });

//   return (
//     <div className="bg-sky-100 flex h-screen relative">
//       {/* Hamburger Icon or Close (X) icon based on sidebar state */}
//       {!isLoginOrRegister && (
//         <div className="absolute top-5 left-5 z-50">
//           <button
//             className="text-3xl text-black focus:outline-none"
//             onClick={toggleSidebar}
//             style={{ zIndex: 1000 }}
//           >
//             {showSidebar ? <X size={40} /> : '☰'}
//           </button>
//         </div>
//       )}

//       {/* Animated sidebar */}
//       <animated.div className="overflow-hidden" style={sidebarAnimation}>
//         {showSidebar && !isLoginOrRegister && <Sidebar />}
//       </animated.div>

//       <div className="flex-1 flex flex-col justify-center items-center">
//         {/* Content inside Routes */}
//         <div className=''>
//           <Routes>
//             <Route path="/" element={<LoginCentered />} />
//             <Route path="/dashbord" element={<Dashbord />} />
//             <Route path="/country" element={<Country />} />
//             <Route path="/state" element={<State />} />
//             <Route path="/city" element={<City />} />
//             <Route path="/register" element={<RegisterCentered />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// const LoginCentered = () => (
//   <div className="w-full max-w-md flex items-center justify-center h-screen">
//     <Login />
//   </div>
// );

// const RegisterCentered = () => (
//   <div className="w-full max-w-md flex items-center justify-center h-screen ">
//   <Register />
// </div>
// );

// export default App;

import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './component/login';
import State from './component/state';
import Country from './component/country';
import City from './component/city';
import Dashbord from './component/dashbord';
import Sidebar from './component/sidebar';
import Register from './component/Register';
import Navbar from './component/Navbar';
import { X } from 'lucide-react'; // Import the X icon

function App() {
  const location = useLocation();
  const isRootUrl = location.pathname === '/';
  const isRegisterRoute = location.pathname === '/';
  
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Check if the current route is login or register
  const isLoginOrRegister = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="bg-sky-100 flex h-screen relative">
      {/* Hamburger Icon or Close (X) icon based on sidebar state */}
      {!isLoginOrRegister && (
        <div className="absolute top-5 left-5 z-50">
          <button
            className="text-3xl text-black focus:outline-none"
            onClick={toggleSidebar}
            style={{ zIndex: 1000 }}
          >
            {showSidebar ? <X size={40} /> : '☰'}
          </button>
        </div>
      )}

      {showSidebar && !isLoginOrRegister && <Sidebar />}

      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Content inside Routes */}
        <div>
          <Routes>
            <Route path="/" element={<LoginCentered />} />
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/country" element={<Country />} />
            <Route path="/state" element={<State />} />
            <Route path="/city" element={<City />} />
            <Route path="/register" element={<RegisterCentered />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const LoginCentered = () => (
  <div className="w-full max-w-md">
    <Login />
  </div>
);

const RegisterCentered = () => (
  <div className="w-full max-w-md">
    <Register />
  </div>
);

export default App;
