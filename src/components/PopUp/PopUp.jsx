import React from "react";
import "./PopUp.css";

const PopUp = ({
  children = <></>,
  showPopUp = false,
  setShowPopUp = () => {},
}) => {
  const handleOutsideClick = () => {
    setShowPopUp(false);
  };

  const handleInsideClick = (e) => {
    e.stopPropagation();
  };

  if (!showPopUp) {
    return <></>;
  }

  return (
    <div className="PopUp" onClick={handleOutsideClick}>
      <div className="PopUp_content" onClick={handleInsideClick}>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
