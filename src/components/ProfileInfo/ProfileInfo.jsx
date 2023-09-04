import "./ProfileInfo.css";
import React from "react";

const userInfo = {
  email: "abc@abcgmail.com",
  username: "Anonymous Person",
  password: "strongPassword",
  carNumber: "DUBAI 007",
  file: {
    selectedFile: null,
    base64String: "",
  },
};

const ProfileInfo = ({ showProfileInfo, setShowProfileInfo }) => {
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
          {userInfo.email}
        </div>
        <div className="ProfileInfo_item">
          <div>Username</div>
          <div>:</div>
          {userInfo.username}
        </div>
        <div className="ProfileInfo_item">
          <div>password</div>
          <div>:</div>
          {userInfo.password}
        </div>
        <div className="ProfileInfo_item">
          <div>Car Number</div>
          <div>:</div>
          {userInfo.carNumber}
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
