import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useState } from "react";
import axios from 'axios';

const Login2 = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  // for refresh token
  const [refresh_tokenjwt, refresh_setToken] = useState();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setToken()// if token is present in the cookies by defualt then remove it before new login
    e.preventDefault();

    try {
      console.log(formData)
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', formData);
      
      console.log(response.data)
      // Extract the JWT token from the response
      const { access_token: newToken } = response.data;// the will only store acess token not refresh token

      // refresh token
      const { refresh_token: newRefreshToken } = response.data;
      localStorage.setItem("refresh_token", newRefreshToken);
      

      // const newToken=response.data
      setToken(newToken); //access token

      // setting login done alert
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome You are logged in sucessfully',
      });
      
      navigate('/Home', { replace: true });

    } catch (error) {
      console.error('Login failed:', error.message);
      const newerr = error.message;
      setError(newerr);
      //  when login is failed
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' enter the proper credian tials '+error,
      });
    }

    navigate("/Profile", { replace: true });
  };

  return (
    <div style={{width:"100vw"
    ,backgroundImage: `url('https://comp.gcoej.ac.in/images/IMG_20160417_065858.jpg')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center'}} className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 text-white  bg-white rounded-full">Login to Your Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login2;
