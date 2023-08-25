import React from "react";
import "./BookPopUp.css";
import PopUp from "../PopUp/PopUp";

const BookPopUp = ({ showPopUp, setShowPopUp }) => {
  return (
    <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
      <div className="BookPopUp">Content</div>
    </PopUp>
  );
};

export default BookPopUp;
