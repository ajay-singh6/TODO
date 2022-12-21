import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
function PrivateRoute( {isAuthenticated} ) {
  const { user } = useContext(UserContext);
  // console.log("Private route.js (authtd): "+ isAuthenticated);

  return <>{ isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} />}</>;
  
}

export default PrivateRoute;
