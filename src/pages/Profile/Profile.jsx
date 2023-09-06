import "./Profile.css";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileUpdate from "../../components/ProfileUpdate/ProfileUpdate";
import { useSelector } from "react-redux";
import { loginStore } from "../Login/redux/LoginSlice";
import { commonStore } from "../../commonSlice";

const Profile = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const { userData } = useSelector(loginStore);
  const { showDrawer } = useSelector(commonStore);
  return (
    <>
      <NavBar />
      <div className={`main_background ${showDrawer ? "Drawer_opened" : ""}`}>
        {showProfileInfo ? (
          <ProfileInfo
            showProfileInfo={showProfileInfo}
            setShowProfileInfo={setShowProfileInfo}
            userData={userData}
          />
        ) : (
          <ProfileUpdate
            showProfileInfo={showProfileInfo}
            setShowProfileInfo={setShowProfileInfo}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
