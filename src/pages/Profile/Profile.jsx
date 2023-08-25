import "./Profile.css";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileUpdate from "../../components/ProfileUpdate/ProfileUpdate";

const Profile = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(true);

  return (
    <>
      <NavBar />
      <div className="main_background">
        {showProfileInfo ? (
          <ProfileInfo
            showProfileInfo={showProfileInfo}
            setShowProfileInfo={setShowProfileInfo}
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
