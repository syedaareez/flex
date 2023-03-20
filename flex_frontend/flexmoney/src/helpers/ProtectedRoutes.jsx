import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom/dist';
import useAuth from '../hooks/useauth';
// import AuthForms from '../pages/authForms';



const ProtectedRoutes = () => {

  const location=useLocation();
  const isauth=useAuth();

//   return isauth?<Outlet />:<AuthForms />;  
// This will take us to the route but will rendersignin page itself

  return isauth?<Outlet />:<Navigate to="/signin" replace state={{from:location}}/>; 
//   This will navigate us back to the "/" page everytime wetry to go to protected routes
}

export default ProtectedRoutes