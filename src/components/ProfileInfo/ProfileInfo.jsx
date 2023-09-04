import React from "react";
import "./ProfileInfo.css";

const ProfileInfo = ({ showProfileInfo, setShowProfileInfo, userData }) => {
  const handleProfileUpdate = () => {
    setShowProfileInfo(false);
  };

  return (
    <div className="ProfileInfo">
      <div className="ProfileInfo_title">Profile Info</div>
      <div className="ProfileInfo_content">
        <div className="ProfileInfo_image_wrapper">
          <div className="ProfileInfo_image">Image</div>
        </div>
        <div className="ProfileInfo_item">
          <div>Email</div>
          <div>:</div>
          {userData.email}
        </div>
        <div className="ProfileInfo_item">
          <div>Username</div>
          <div>:</div>
          {userData.name}
        </div>
        <div className="ProfileInfo_item">
          <div>password</div>
          <div>:</div>
          {userData.password}
        </div>
        <div className="ProfileInfo_item">
          <div>Car Number</div>
          <div>:</div>
          {userData.carNumber}
        </div>
      </div>
      <div className="ProfileInfo_btn_wrapper">
        <div className="ProfileInfo_btn" onClick={handleProfileUpdate}>
          Update
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
