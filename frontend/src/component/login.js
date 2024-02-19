import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

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
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Successful login, navigate to the dashboard
        navigate('/dashbord');
      } else {
        console.log('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='flex flex-col  items-center justify-center w-[100%] m-auto'>
      <h1 className='mb-32 mt-20 text-6xl font-bold'>Login</h1>
      <div className='flex flex-col border-4 border-black p-6'>
        <div className='flex'>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='border-4 border-black mx-4'
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='border-4 border-black mr-4 my-4 ml-6'
          />
        </div>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Login;