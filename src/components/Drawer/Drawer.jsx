import React from "react";
import "./Drawer.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../utils/RouteConstants";

const Drawer = ({ showDrawer = false }) => {
  const navigate = useNavigate();
  return (
    <div className={`Drawer ${showDrawer && "Drawer_open"}`}>
      <div className="Drawer_item" onClick={() => navigate(AllRoutes.HOME)}>
        <div className="Drawer_icon">
          <HomeIcon />
        </div>
        <div className="Drawer_title">Home</div>
      </div>
      <div className="Drawer_item" onClick={() => navigate(AllRoutes.PAYMENTS)}>
        <div className="Drawer_icon">
          <HomeIcon />
        </div>
        <div className="Drawer_title">Payments</div>
      </div>
      <div className="Drawer_item" onClick={() => navigate(AllRoutes.HISTORY)}>
        <div className="Drawer_icon">
          <HomeIcon />
        </div>
        <div className="Drawer_title">History</div>
      </div>
      <div className="Drawer_item" onClick={() => navigate(AllRoutes.PROFILE)}>
        <div className="Drawer_icon">
          <HomeIcon />
        </div>
        <div className="Drawer_title">Profile</div>
      </div>
    </div>
  );
};

export default Drawer;
