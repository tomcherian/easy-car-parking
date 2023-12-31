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
import { getDateLocalTime, getUserData } from "../../utils/commonFunctions";
import moment from "moment/moment";
import { loginStore } from "../Login/redux/LoginSlice";
import { capitalizeWords } from "../Home/Home";
import SettleUpIcon from "../../assets/images/settleUpIcon.png";
import { commonStore } from "../../commonSlice";

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
  }, [userData]);

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
        capitalizeWords(
          getUserData(data.payerUserId, usersData)?.name ?? "User"
        ),
        getUserData(data.payerUserId, usersData)?.email,
        getDateLocalTime(data.date),
        data?.amount,
      ];
    });
    setRowData(tempRowData);
  }, [paymentListData, usersData]);
  const { showDrawer } = useSelector(commonStore);
  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "UserId" },
      { title: "User Name" },
      { title: "Email" },
      { title: "Paid Date", align: "left" },
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
      amount: -paymentData.amountToSettle,
      date: moment().format(),
    };
    dispatch(postPaymentSettleUp(body));
  };

  const getSettleAmount = () => {
    let amountShouldSettle = 0;
    paymentSettleUpData.forEach((data) => {
      if (data.amountToSettle < 0) {
        amountShouldSettle += data.amountToSettle;
      }
    });
    return amountShouldSettle;
  };

  const getReceivingAmount = () => {
    let amountShouldReceivingAmount = 0;
    paymentSettleUpData.forEach((data) => {
      if (data.amountToSettle > 0) {
      amountShouldReceivingAmount += data.amountToSettle;
      }
    });
    return amountShouldReceivingAmount;
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
      <div
        className={`Payment_wrapper main_background Drawer_animation ${
          showDrawer && "Drawer_opened"
        }`}
      >
        <div className="Payment_row_1">
          <div className="Payment_row_show">
            <div className="Payment_row_show">
              <div className="Payment_card Payment_card_1">
                <div className="Payment_card_title">Amount To Be Settled</div>
                <div className="Payment_card_value">
                  {settleAmount < 0 ? 0 : -Number(getSettleAmount()).toFixed(2)}{" "}
                  DHS
                </div>
              </div>
            </div>
            <div className="Payment_row_show">
              <div className="Payment_card Payment_card_1">
                <div className="Payment_card_title">Amount To Be Received</div>
                <div className="Payment_card_value">
                  {settleAmount < 1
                    ? 0
                    : Number(getReceivingAmount()).toFixed(2)}{" "}
                  DHS
                </div>
              </div>
            </div>
          </div>
          <div className="Payment_row_buttons">
            <div
              className="Payment_card_2 Payment_Add_button"
              onClick={handleAddPayment}
            >
              <button className="btn btn-primary Payment_button">
                <div className="Payment_card_add_icon">
                  <AddCircleOutlineIcon fontSize="large" />
                </div>
                <div>Add payment</div>
              </button>
            </div>
            <div className="Payment_card_3" onClick={handleSettle}>
              <button className="btn btn-primary Payment_button">
                <img
                  src={SettleUpIcon}
                  alt="Settle up"
                  className="Settle_up_icon"
                />
                <div>Settle Now</div>
              </button>
            </div>
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
