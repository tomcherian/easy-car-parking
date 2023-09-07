import "./Profile.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileUpdate from "../../components/ProfileUpdate/ProfileUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getEachUser, loginStore } from "../Login/redux/LoginSlice";
import { commonStore } from "../../commonSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [showProfileInfo, setShowProfileInfo] = useState(true);
  const { userData } = useSelector(loginStore);
  const { showDrawer } = useSelector(commonStore);

  useEffect(() => {
    if (showProfileInfo) {
      dispatch(getEachUser());
    }
  }, [showProfileInfo]);

  return (
    <>
      <NavBar />
      <div
        className={`main_background Drawer_animation ${
          showDrawer && "Drawer_opened"
        }`}
      >
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
            userData={userData}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
