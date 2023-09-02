import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Payment.css";
import PaymentPopUp from "../../components/PaymentPopUp/PaymentPopUp";
import BasicTable from "../../components/Table/Table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPaymentPopUp from "../../components/AddPaymentPopup/AddPaymentPopup";

const Payment = () => {
  const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
  const [showAddPaymentPopUp, setShowAddPaymentPopUp] = useState(false);
  const [payment, setPayment] = useState(undefined);

  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "S.No" },
      { title: "Person" },
      { title: "Card Number", align: "right" },
      { title: "Amount", align: "right" },
    ],
    rowData: [
      [1, "Person 1", 1, 100],
      [2, "Person 2", 2, 200],
      [3, "Person 3", 3, 300],
      [4, "Person 4", 4, 400],
    ],
  };

  const handleSettle = () => {
    setShowPaymentPopUp(true);
  };

  const handleAddPayment = () => {
    setShowAddPaymentPopUp(true);
  };

  const applyPayment = () => {
    setShowAddPaymentPopUp(false);
    setPayment(undefined)
    console.log("payment", payment);
  };

  return (
    <>
      <NavBar />
      <PaymentPopUp
        showPopUp={showPaymentPopUp}
        setShowPopUp={setShowPaymentPopUp}
      />
      <AddPaymentPopUp
        showPopUp={showAddPaymentPopUp}
        setShowPopUp={setShowAddPaymentPopUp}
        onAddPayment={applyPayment}
        payment={payment}
        setPayment={setPayment}
      />
      <div className="Payment_wrapper main_background">
        <div className="Payment_row_1">
          <div className="Payment_card Payment_card_1">
            <div className="Payment_card_title">Amount To Be Settled</div>
            <div className="Payment_card_value">100 DHS</div>
          </div>
          <div
            className="Payment_card Payment_card_1 Payment_Add_button"
            onClick={handleAddPayment}
          >
            <div>Add payment</div>
          </div>
          <div className="Payment_card Payment_card_2" onClick={handleSettle}>
            <div className="Payment_card_add_icon">
              <AddCircleOutlineIcon fontSize="large" />
            </div>
            <div>Settle Now</div>
          </div>
        </div>
        <div className="Payment_row_2">
          <div className="Payment_table_wrapper">
            <BasicTable data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
