// import React from "react";



// function dashbord() {
    
//     return (
//         <div>
//             <div>
//                 <div className="text-black">welcome</div>
//             </div>
//         </div>
//   );
// }

// export default dashbord;

import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Dashbord() {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {

        console.log("token not experied")
      const tokenTimestamp = localStorage.getItem("tokenTimestamp");

      if (tokenTimestamp) {
        const currentTime = Date.now();
        const expirationTime = parseInt(tokenTimestamp, 10) + 30 * 60 * 1000;  

        if (currentTime > expirationTime) {
          console.log("Token expired");
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenTimestamp');
          navigate('/');
        }
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div>
      <div>
        <div className="text-black">Welcome</div>
      </div>
    </div>
  );
}

export default Dashbord;


