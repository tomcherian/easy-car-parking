import React, { useEffect, useState } from "react";
import "./PaymentPopUp.css";
import PopUp from "../PopUp/PopUp";
import { capitalizeWords } from "../../pages/Home/Home";

const PaymentPopUp = ({
  showPopUp,
  setShowPopUp,
  settleUpData,
  onHandleSettleUp,
}) => {
  const [isCreditList, setIsCreditList] = useState(true);
  const [creditUsersData, setCreditUsersData] = useState([]);
  const [debitUsersData, setDebitUsersData] = useState([]);

  useEffect(() => {
    if (settleUpData?.length) {
      setCreditUsersData(
        settleUpData.filter((userData) => userData.amountToSettle > 1)
      );
      setDebitUsersData(
        settleUpData.filter((userData) => userData.amountToSettle < 0)
      );
    }
  }, [settleUpData]);

  const toggleList = () => {
    setIsCreditList((prevState) => !prevState);
  };

  return (
    <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
      <div className={`PaymentPopUp ${isCreditList ? "Is_credit_popup" : ""}`}>
        <div className="Payment_popup_wrapper">
          <div className="SettleUp_heading">Settle Up</div>
          <div className="SettleUp_Filter_wrapper">
            <div
              className={`Credit_heading Credit_debit_header ${
                isCreditList ? "Div_highlight" : ""
              }`}
              onClick={toggleList}
            >
              Credit
            </div>
            <div
              className={`Debit_heading Credit_debit_header ${
                !isCreditList ? "Div_highlight" : ""
              }`}
              onClick={toggleList}
            >
              Debit
            </div>
          </div>
          <div className="SettleUp_users_list">
            {(isCreditList ? creditUsersData : debitUsersData).map(
              (data, index) => (
                <div className="Settle_up_list_wrapper" key={index}>
                  <div className="Settle_up_list_user_wrapper">
                    <div>{capitalizeWords(data.user.name)}</div>
                    <div>
                      {isCreditList
                        ? Number(data.amountToSettle).toFixed(2)
                        : -Number(data.amountToSettle).toFixed(2)}{" "}
                      AED
                    </div>
                  </div>
                  {!isCreditList && (
                    <div className="Settle_up_button_wrapper">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          onHandleSettleUp(data);
                        }}
                      >
                        Settle
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
        {/* {!isCreditList && (
          <button className="btn btn-primary">Settle All</button>
        )} */}
      </div>
    </PopUp>
  );
};

export default PaymentPopUp;
