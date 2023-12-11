import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import {useState} from "react";
import axios from 'axios';

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // const { token, setToken } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });


  // const handleLogin = () => {
  //   setToken("this is a test token");
  //   navigate("/", { replace: true });
  // };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);


  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    try {
      // Make a POST request to your API endpoint
      console.log(formData)
      const response = await axios.post('http://localhost:8080/authenticate', formData);

//       Extract the JWT token from the response
      const { token:newToken } = response.data;
      setToken(newToken)
      console.log(response.data)
      // Pass the token to the parent component

    } catch (error) {
      console.error('login failed:', error.message);
      // Handle registration failure (display error message, etc.)
    }

    navigate("/Profile", { replace: true });
  };

  return <>
 <form onSubmit={handleSubmit}>
      

    
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

      <button type="submit">Login</button>
    </form>
  </>;
};


export default Login;
