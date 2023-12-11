import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Login2 from "../pages/Login2";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Register2 from "../pages/Register2";
import Profile from "../pages/Profile";
import Header from "../components/Header.jsx";
import Home from "../pages/Home.jsx";
import UserHome from "../pages/UserHome.jsx";

const Routes = () => {
  const { token } = useAuth();
  const URL="";
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: URL+"/register",
      element: <Register2/>,
    },
    {
      path: URL+"/login",
      element: <Login2/>,
    },
    {
      path: URL+"/service",
      element: <div>Service Page</div>,
    },
    {
      path: URL+"/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: URL+"/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: URL+"",
          element: <UserHome/>,
        },
        {
          path: URL+"/Profile",
          element: <Profile/>,
        },
        {
          path: URL+"/logout",
          element: <Logout/>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: URL+"/",
      element: <Home/>,
    },
   
    
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([

    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <>
  <Header></Header>
  <RouterProvider router={router} /></>;
};

export default Routes;
