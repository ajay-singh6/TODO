import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
function PrivateRoute() {
  const { user } = useContext(UserContext);

  return <>{user?.id ? <Outlet /> : <Navigate to={"/signin"} />}</>;
}

export default PrivateRoute;
