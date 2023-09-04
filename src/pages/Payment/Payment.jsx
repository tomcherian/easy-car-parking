import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import PaymentPopUp from "../../components/PaymentPopUp/PaymentPopUp";
import BasicTable from "../../components/Table/Table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPaymentPopUp from "../../components/AddPaymentPopup/AddPaymentPopup";
import {
  getPaymentList,
  getPaymentSettleUpList,
  paymentStore,
  postPayment,
  postPaymentSettleUp,
} from "./redux/PaymentSlice";
import Loader from "../../components/Loader/Loader";
import "./Payment.css";
import { dashboardStore, getUsersData } from "../Home/redux/HomeSlice";
import { getUserData } from "../../utils/commonFunctions";
import moment from "moment/moment";
import { loginStore } from "../Login/redux/LoginSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
  const [showAddPaymentPopUp, setShowAddPaymentPopUp] = useState(false);
  const [payment, setPayment] = useState(undefined);
  const [rowData, setRowData] = useState([]);
  const [settleAmount, setSettleAmount] = useState(0);
  const {
    isLoading,
    paymentListData,
    isPaymentAddedSuccess,
    paymentSettleUpData,
  } = useSelector(paymentStore);
  const { isLoading: dashboardLoading, usersData } =
    useSelector(dashboardStore);
  const { userData } = useSelector(loginStore);

  useEffect(() => {
    dispatch(getPaymentList());
    dispatch(getUsersData());
    dispatch(getPaymentSettleUpList({ userId: userData.id }));
  }, []);

  useEffect(() => {
    if (isPaymentAddedSuccess) {
      setShowAddPaymentPopUp(false);
      setPayment(undefined);
    }
  }, [isPaymentAddedSuccess]);

  useEffect(() => {
    let settleAmount = 0;
    if (paymentSettleUpData?.length > 0)
      paymentSettleUpData.map((data) => (settleAmount += data?.amountToSettle));
    setSettleAmount(Number(settleAmount.toFixed(2)));
  }, [paymentSettleUpData]);

  useEffect(() => {
    const tempRowData = paymentListData?.map((data) => {
      return [
        data.payerUserId,
        getUserData(data.payerUserId, usersData)?.name ?? "User",
        data?.amount,
      ];
    });
    setRowData(tempRowData);
  }, [paymentListData, usersData]);

  const tableData = {
    headerBgColor: "#FED94D",
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
    if (userData?.id || sessionStorage.getItem("userId")) {
      const paymentBody = {
        amount: payment,
        date: moment().format(),
        payerUserId: userData?.id ?? sessionStorage.getItem("userId"),
      };
      dispatch(postPayment(paymentBody));
    }
  };

  const onHandleSettleUp = (paymentData) => {
    const body = {
      payerUserId: userData.id,
      receiverUserId: paymentData.user.id,
      amount: paymentData.amountToSettle,
      date: moment().format(),
    };
    dispatch(postPaymentSettleUp(body));
  };

  return (
    <>
      {(isLoading || dashboardLoading) && <Loader />}
      <NavBar />
      <PaymentPopUp
        showPopUp={showPaymentPopUp}
        setShowPopUp={setShowPaymentPopUp}
        settleUpData={paymentSettleUpData}
        onHandleSettleUp={onHandleSettleUp}
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
            <div className="Payment_card_value">{settleAmount} DHS</div>
          </div>
          <div
            className="Payment_card Payment_card_2 Payment_Add_button"
            onClick={handleAddPayment}
          >
            <div>Add payment</div>
          </div>
          <div className="Payment_card Payment_card_3" onClick={handleSettle}>
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
