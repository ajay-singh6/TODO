import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute( {isAuthenticated} ) {

  return <>{ isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} />}</>;
  
}

export default PrivateRoute;
