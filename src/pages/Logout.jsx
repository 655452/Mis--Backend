import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    localStorage.removeItem("refresh_token");// removing refresh token
    
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 1 * 1000);

  return <>
  <div style={{width:"100vw",height:"100vh"}}>
    <h1>LOGOUT</h1>
    </div></>;
};

export default Logout;
