import React from "react";
import "./PaymentPopUp.css";
import PopUp from "../PopUp/PopUp";

const PaymentPopUp = ({ showPopUp, setShowPopUp }) => {
  return (
    <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
      <div className="PaymentPopUp">Content</div>
    </PopUp>
  );
};

export default PaymentPopUp;
