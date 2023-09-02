import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import PaymentPopUp from "../../components/PaymentPopUp/PaymentPopUp";
import BasicTable from "../../components/Table/Table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPaymentPopUp from "../../components/AddPaymentPopup/AddPaymentPopup";
import { getPaymentList, paymentStore } from "./redux/PaymentSlice";
import Loader from "../../components/Loader/Loader";
import "./Payment.css";
import { dashboardStore, getUsersData } from "../Home/redux/HomeSlice";
import { getUserData } from "../../utils/commonFunctions";

const Payment = () => {
  const dispatch = useDispatch();
  const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
  const [showAddPaymentPopUp, setShowAddPaymentPopUp] = useState(false);
  const [payment, setPayment] = useState(undefined);
  const [rowData, setRowData] = useState([]);
  const { isLoading, paymentListData } = useSelector(paymentStore);
  const { isLoading: dashboardLoading, usersData } =
    useSelector(dashboardStore);

  useEffect(() => {
    dispatch(getPaymentList());
    dispatch(getUsersData());
  }, []);

  useEffect(() => {
    console.log("paymentlist data", paymentListData);
    const tempRowData = paymentListData?.map((data) => {
      console.log(
        "getUserData(data.payerUserId, usersData)",
        getUserData(data.payerUserId, usersData)
      );
      return [
        data.payerUserId,
        getUserData(data.payerUserId, usersData)?.name ?? "User",
        data?.amount,
      ];
    });
    setRowData(tempRowData);
  }, [paymentListData]);

  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "User Id" },
      { title: "Person" },
      { title: "Amount", align: "right" },
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
    setPayment(undefined);
  };

  return (
    <>
      {(isLoading || dashboardLoading) && <Loader />}
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
            <BasicTable data={tableData} rowData={rowData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
