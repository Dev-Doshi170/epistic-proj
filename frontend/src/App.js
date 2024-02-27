// import React from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Login from './component/login';
// import State from './component/state';
// import Country from './component/country';
// import City from './component/city';
// import Dashbord from './component/dashbord';
// import Sidebar from './component/sidebar';
// import Register from './component/Register';

// function App() {
//   const location = useLocation();
//   const isRootUrl = location.pathname === '/';

  

//   return (
//     <div className="bg-sky-100 flex h-screen relative">
//     {!isRootUrl && <Sidebar />}
//     <div className="flex-1 flex flex-col justify-center items-center">
//         {/* Container for Snowfall Animation */}
//         <div ></div>

//         {/* Content inside Routes */}
//         <div>
//             <Routes>
//                 <Route path="/" element={<LoginCentered />} />
//                 <Route path="/dashbord" element={<Dashbord />} />
//                 <Route path="/country" element={<Country />} />
//                 <Route path="/state" element={<State />} />
//                 <Route path="/city" element={<City />} />
//             </Routes>
//         </div>
//     </div>
// </div>

    
//   );
// }

// const LoginCentered = () => (
//   <div className="w-full max-w-md">
//     <Login />
//   </div>
// );

// export default App;

import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './component/login';
import State from './component/state';
import Country from './component/country';
import City from './component/city';
import Dashbord from './component/dashbord';
import Sidebar from './component/sidebar';
import Register from './component/Register';

function App() {
  const location = useLocation();
  const isRootUrl = location.pathname === '/';
  const isRegisterRoute = location.pathname === '/register';

  return (
    <div className="bg-sky-100 flex h-screen relative">
      {!isRootUrl && !isRegisterRoute && <Sidebar />}
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Container for Snowfall Animation */}
        <div></div>

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




