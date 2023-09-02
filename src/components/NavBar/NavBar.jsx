import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import Drawer from "../Drawer/Drawer";
import { AllRoutes } from "../../utils/RouteConstants";
import { loginStore, setIsLoggedIn } from "../../pages/Login/redux/LoginSlice";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  const { userData } = useSelector(loginStore);

  const handleProfile = () => {
    setShowUserMenu(false);
  };

  const handleSignout = () => {
    setShowUserMenu(false);
    dispatch(setIsLoggedIn(false));
    sessionStorage.clear();
    navigate(AllRoutes.LOGIN);
  };

  return (
    <div className="NavBar_main_wrapper">
      <div className="NavBar">
        <div className="NavBar_container">
          <div className="NavBar_icon_wrapper">
            <MenuIcon
              className="NavBar_icon"
              onClick={() => {
                setShowDrawer((value) => !value);
              }}
            />
            <Drawer showDrawer={showDrawer} />
          </div>
          <div className="NavBar_title">My App</div>
          <div className="NavBar_signout">
            <span className="NavBar_signout_wrapper">
              {userData?.name ?? "User"}
              <AccountCircle
                className="NavBar_icon"
                onClick={() => {
                  setShowUserMenu((value) => !value);
                }}
              />
              {showUserMenu && (
                <div className="NavBar_menu_options">
                  <div className="NavBar_menu_option" onClick={handleProfile}>
                    Profile
                  </div>
                  <div className="NavBar_menu_option" onClick={handleSignout}>
                    Signout
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
