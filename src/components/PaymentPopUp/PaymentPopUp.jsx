import React from "react";
import "./PaymentPopUp.css";
import PopUp from "../PopUp/PopUp";

const PaymentPopUp = ({ showPopUp, setShowPopUp, settleUpData, onHandleSettleUp }) => {
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
          {settleUpData.map((data) => (
            <div className="Settle_up_list_wrapper" key={data.userId}>
              <div className="Settle_up_list_user_wrapper">
                <div>{data.user.name}</div>
                <div>{data.amountToSettle} AED</div>
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
