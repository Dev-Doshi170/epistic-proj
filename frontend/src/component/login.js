import { useNavigate,Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      // const authTokenInStorage = localStorage.getItem('authToken');
  
      // if (authTokenInStorage) {
      //   // If authToken is present in local storage, directly navigate to the dashboard
      //   navigate('/dashbord');
      //   return;
      // }
  
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('tokenTimestamp', Date.now());
        localStorage.setItem('username',formData.username)
        localStorage.setItem('password',formData.password)
        navigate('/dashbord');
      } else {
        // Login failed, show error message in toast
        toast.error(data.message || 'Incorrect username or password');
        console.log('Login failed:', data);
      }
    } catch (error) {
      // Error during login, show error message in toast
      toast.error('Error during login');
      console.error('Error during login:', error);
    }
  };
  

  // Optional: Redirect to dashboard if authToken is present during component mount
  useEffect(() => {
    const authTokenInStorage = localStorage.getItem('authToken');
    if (authTokenInStorage) {
      navigate('/dashbord');
    }
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center w-[100%] m-auto'>
      <h1 className=' mb-10 text-6xl font-bold'>Login</h1>
      <div className='flex justify-center items-center flex-col  p-6'>
        <div className=''>
          <label className='text-lg font-semibold' >User Name</label>
          <input
            type='text'
            name='username'
            placeholder='User Name'
            value={formData.username}
            onChange={handleChange}
            className='p-2 border-2 border-black mx-4 rounded-lg'
          />
        </div>
        <div className=''>
          <label className='text-lg font-semibold'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Pasword'
            value={formData.password}
            onChange={handleChange}
            className='p-2 border-2 border-black mr-4 my-4 ml-7 rounded-lg ' 
          />
        </div>
        <button className='mt-3 bg-black text-white font-semibold h-[3rem] w-24 rounded-xl ' onClick={submitHandler}>Submit</button>
      </div>

      <div className='mt-4 text-sm'>
          Not a registered user?{' '}
          <Link to='/register' className='text-blue-500'>
            Register here
          </Link>
        </div>
    </div>
  );
};

export default Login;


