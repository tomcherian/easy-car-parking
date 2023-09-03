import React from "react";
import IconCross from "../../assets/images/IconCross.jpg";
import "./PopUp.css";

const PopUp = ({
  children = <></>,
  showPopUp = false,
  setShowPopUp = () => {},
  onClose = () => {},
}) => {
  const handleOutsideClick = () => {
    setShowPopUp(false);
    onClose();
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
        <div className="Icon_wrapper">
          <div className="Icon_cross_wrapper" onClick={handleOutsideClick}>
            <img
              src={IconCross}
              className="Icon_cross"
              alt="Cross Icon"
              height={20}
              width={20}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
