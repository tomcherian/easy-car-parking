import React from "react";
import PopUp from "../PopUp/PopUp";
import "./AddPaymentPopup.css";

const AddPaymentPopUp = ({
  showPopUp,
  setShowPopUp,
  onAddPayment,
  payment,
  setPayment,
}) => {
  return (
    <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
      <div className="Add_payment_wrapper">
        <div className="Add_PaymentPopUp">Add Payment Here</div>
        <div className="input-group">
          <input
            value={payment}
            onChange={(event) => {
              setPayment(event.target.value);
            }}
            type="number"
            className="form-control"
            placeholder="Add Payment Here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </div>
        <button
          className="add-button"
          type="button"
          onClick={onAddPayment}
        >
          Paid
        </button>
      </div>
    </PopUp>
  );
};

export default AddPaymentPopUp;
