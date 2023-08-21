import React from "react";
import { useNavigate } from "react-router";
import "./NotFound.css";
import { FeRoutes } from "../../utils/RouteConstants";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="Not_found_container">
      <div className="Not_found_image"></div>
      <button
        className="Not_found_navigate_button"
        onClick={() => {
          navigate(FeRoutes.LOGIN);
        }}
      >
        Navigate to Login screen
      </button>
    </div>
  );
}

export default NotFound;
