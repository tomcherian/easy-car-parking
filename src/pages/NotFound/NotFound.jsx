import React from "react";
import { useNavigate } from "react-router";
import "./NotFound.css";
import { AllRoutes } from "../../utils/RouteConstants";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="Not_found_container">
      <div className="Not_found_image"></div>
      <button
        className="Not_found_navigate_button"
        onClick={() => {
          navigate(AllRoutes.LOGIN);
        }}
      >
        Navigate to Login screen
      </button>
    </div>
  );
};

export default NotFound;
