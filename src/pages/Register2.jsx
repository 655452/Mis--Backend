import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import "../assets/style.css";

const Register2 = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    setToken(); // if token is present in the cookies by default then remove it before new Register
    localStorage.removeItem('refresh_token'); // taking out the refresh token

    // checking if confirm password and password are the same or not
    if (e.target.cpassword.value !== e.target.password.value) {
      e.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Confirm password and password do not match!',
      });
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      });
    } else {
      e.preventDefault();
      try {
        // Make a POST request to your API endpoint
        const response = await axios.post(
          'http://localhost:8080/api/v1/auth/register',
          formData
        );

        // Extract the JWT token from the response
        // const { token: newToken } = response.data;
        // setToken(newToken);
      } catch (error) {
        console.error('Registration failed:', error.message);
        // Handle registration failure (display error message, etc.)
      }
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in with your credentials.',
      });
      navigate('/login', { replace: true });
    }
  };

  return (
    <div style={{ width: "100vw", backgroundImage: `url('https://comp.gcoej.ac.in/images/IMG_20160417_065858.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div style={{ opacity: 0.8, backgroundColor: 'transparent' }} className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transition-transform transform hover:scale-105 ease-in-out">
        {/* Professional Image */}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-wrap">
            <label htmlFor="firstname" className="text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="block w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 rounded-md "
            />
          </div>

          <div className="form-wrap">
            <label htmlFor="lastname" className="text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="block w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 rounded-md "
            />
          </div>

          <div className="form-wrap">
            <label htmlFor="email" className="text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 rounded-md "
            />
          </div>

          <div className='form-wrap'>
            <label htmlFor="password" className="text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 rounded-md "
            />
          </div>


          <div className='form-wrap'>
            <label htmlFor="cpassword" className="text-gray-600">
               Confirm Password:
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
             
              onChange={handleChange}
              required
              className="block w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 rounded-md "
            />
          </div>
          <center>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 "
            >
              Register
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Register2;
