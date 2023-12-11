import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/authProvider';

import { useNavigate } from "react-router-dom";

const Register = ({ onRegistrationSuccess }) => {
    const { token, setToken } = useAuth();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      // Make a POST request to your API endpoint
      console.log(formData)
      const response = await axios.post('http://localhost:8080/register', formData);

//       Extract the JWT token from the response
      const { token:newToken } = response.data;
      setToken(newToken);
      console.log(response.data)
      // Pass the token to the parent component
     
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration failure (display error message, etc.)

      //  navigate to the login page
      
    }
    navigate("/login", { replace: true });

  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      /><br />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      /><br />

      <label htmlFor="login">Email:</label>
      <input
        type="email"
        id="login"
        name="login"
        value={formData.login}
        onChange={handleChange}
        required
      /><br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      /><br />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
