import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = sessionStorage.getItem("access_token");
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
