import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getEachUser, loginStore } from "../../pages/Login/redux/LoginSlice";
import Loader from "../Loader/Loader";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("access_token");
  const { userData, isLoading } = useSelector(loginStore);
  useEffect(() => {
    if (!userData?.id) {
      dispatch(getEachUser());
    }
  }, [userData]);
  return accessToken ? (
    <>
      {isLoading && <Loader />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
