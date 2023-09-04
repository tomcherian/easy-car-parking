import "./Profile.css";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileUpdate from "../../components/ProfileUpdate/ProfileUpdate";
import { useSelector } from "react-redux";
import { loginStore } from "../Login/redux/LoginSlice";

const Profile = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const { userData } = useSelector(loginStore);

  return (
    <>
      <NavBar />
      <div className="main_background">
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
