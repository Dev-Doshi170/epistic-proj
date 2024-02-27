import { useNavigate ,Link} from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
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
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registration successful, you can handle the response accordingly
        console.log('Registration successful:', data);
        navigate('/'); // Redirect to login page after successful registration
      } else {
        // Registration failed, show error message in toast
        if (data.errors && data.errors.length > 0) {
          // Display the first error message from the validation errors
          toast.error(data.errors[0].msg || 'Registration failed');
          console.log('Registration failed:', data.errors);
        } else if (data.message) {
          // Display the error message from the server
          toast.error(data.message);
          console.log('Registration failed:', data.message);
        } else {
          // Handle other error scenarios
          toast.error('Registration failed');
          console.log('Registration failed:', data);
        }
      }
    } catch (error) {
      // Error during registration, show error message in toast
      toast.error('Error during registration');
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className='flex flex-col items-center justify-center w-[100%] m-auto'>
      <h1 className='mb-10 text-6xl font-bold'>Register</h1>
      <div className='flex justify-center items-center flex-col p-6'>
        <div className='mb-4'>
          <label className='text-lg font-semibold'>User Name</label>
          <input
            type='text'
            name='username'
            placeholder='User Name'
            value={formData.username}
            onChange={handleChange}
            className='p-2 border-2 border-black mx-4 rounded-lg ml-[72px]'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='p-2 border-2 border-black mx-4 rounded-lg ml-[85px]'
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='p-2 border-2 border-black mx-4 rounded-lg  '
          />
        </div>
        <div className='mb-4'>
          <label className='text-lg font-semibold'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='p-2 border-2 border-black mx-4 rounded-lg ml-[120px]'
          />
        </div>
        <button className='mt-3 bg-black text-white font-semibold h-[3rem] w-24 rounded-xl' onClick={submitHandler}>
          Register
        </button>
      </div>

      <div className='mt-4 text-sm'>
          Already registered user?{' '}
          <Link to='/' className='text-blue-500'>
            Login here
          </Link>
        </div>
    </div>
  );
};

export default Register;
