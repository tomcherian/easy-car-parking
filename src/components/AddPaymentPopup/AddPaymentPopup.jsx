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
        <div className="PaymentPopUp">Add payment here</div>
        <div class="input-group">
          <input
            value={payment}
            onChange={(event) => {
              setPayment(event.target.value);
            }}
            type="number"
            class="form-control"
            placeholder="Add Payment here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </div>
        <button
          class="btn btn-outline-secondary add-button"
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