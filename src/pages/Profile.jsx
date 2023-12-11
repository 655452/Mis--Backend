import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtInterceoptor from '../components/jwtInterceptor';
import { useAuth } from "../provider/authProvider";

const Profile = () => {
  // const [token, setToken] = useState(Cookies.get("token"));// for cookies
  const [token, setToken] = useState(localStorage.getItem("token"));// for cookies
  const [data, update] = useState('nothing');
  const [Admindata, Adminupdate] = useState('nAdmin'); // for admin
  const [movie,setMovies]=useState("");

 

  const handleEmail = async () => {
    try {
      console.log(token);

      const response = await axios.request('http://localhost:8080/api/v1/demo-controller');
     
      console.log(response.data);
      update(response.data);
    } catch (error) {
      console.error('email failed:', error.message);
    }
  };

  const handleAdmin = async () => {
    try {
      
      const response = await axios.request('http://localhost:8080/api/v1/admin');
     
      console.log(response.data);
      Adminupdate(response.data);
    } catch (error) {
      console.error('email failed:', error.message);
    }
  };

  // useEffect(() => {
  //   jwtInterceoptor
  //     .get("http://localhost:8080/api/v1/demo-controller")
  //     .then((response) => {
  //       setMovies(response.data);
  //       update(response.data);
  //       console.log("interceptor"+response.data)
  //     });
  // }, []);
  // useEffect to call handleEmail after component mounts
 
    setTimeout(() => {
      
      handleEmail();
      handleAdmin();
    }, 2* 1000);
  
  return (
    <>
     
        
     
      <div style={{width:"100vw"
    ,backgroundImage: `url('https://comp.gcoej.ac.in/images/IMG_20160417_065858.jpg')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center'
    ,
    height:"100vh"}}>
    <center>
    <button>
          {/* if admin login it will render Admin or else User */}
          {
          (Admindata==="nAdmin")
          ?data:Admindata
          }
          
<br></br>
          
        </button>
    </center>
    </div>
    </>
  );
};

export default Profile;
