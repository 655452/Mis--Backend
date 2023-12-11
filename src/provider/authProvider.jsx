import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  // implementation with local storage
  const [token, setToken_] = useState(localStorage.getItem("token"));
  // implementation with Cookie storage
  // Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
  //   expires: 7,
  // }
  // const [token, setToken_] = useState(Cookies.get("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // with localStorage
      localStorage.setItem("token", token);
      // when we are storing objects
     

      // with cookies
      // Cookies.set("token", token, {
      //   expires: 1,    //in one day
      // });
    } else {
      delete axios.defaults.headers.common["Authorization"];
      // with localStorage
      localStorage.removeItem("token");
      // with cookies
      // Cookies.remove("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
