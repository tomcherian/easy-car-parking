import React from "react";
import "./PaymentPopUp.css";
import PopUp from "../PopUp/PopUp";

const PaymentPopUp = ({ showPopUp, setShowPopUp }) => {
  const sampleData = [
    {
      userId: 1,
      username: "User 1",
      settleAmount: 20,
    },
    {
      userId: 2,
      username: "User 2",
      settleAmount: -20,
    },
    {
      userId: 3,
      username: "User 3",
      settleAmount: 20,
    },
  ];

  return (
    <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
      <div className="PaymentPopUp">
        <div className="Payment_popup_wrapper">
          <div>Settle Up</div>
          {sampleData.map((data) => (
            <div className="Settle_up_list_wrapper" key={data.userId}>
              <div className="Settle_up_list_user_wrapper">
                <div>{data.username}</div>
                <div>{data.settleAmount} AED</div>
              </div>
              <div className="Settle_up_button_wrapper">
                <button className="btn btn-primary">Settle</button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary">Settle All</button>
      </div>
    </PopUp>
  );
};

export default PaymentPopUp;
