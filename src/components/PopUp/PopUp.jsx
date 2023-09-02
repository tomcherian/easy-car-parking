import React from "react";
import IconCross from "../../assets/images/IconCross.jpg";
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
        <div className="Icon_cross_wrapper">
          <img
            onClick={() => {
              setShowPopUp(false);
            }}
            src={IconCross}
            className="Icon_cross"
            alt="Cross Icon"
            height={20}
            width={20}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
