import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicTable from "../../components/Table/Table";
import BarChart from "../../components/BarChart/BarChart";
import BookPopUp from "../../components/BookPopUp/BookPopUp";
import { useDispatch, useSelector } from "react-redux";
import { bookedParkingCard } from "./redux/HomeSlice";
import {
  getPaymentSettleUpList,
  paymentStore,
} from "../Payment/redux/PaymentSlice";
import { commonStore } from "../../commonSlice";
import { loginStore } from "../Login/redux/LoginSlice";
import Loader from "../../components/Loader/Loader";

export function capitalizeWords(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

function isCurrentDateTimeInRange(startDateTime, endDateTime) {
  const currentDate = new Date();
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  return currentDate >= startDate && currentDate <= endDate;
}

const Home = () => {
  const dispatch = useDispatch();
  const [settleAmount, setSettleAmount] = useState(0);
  const bookedParkingCardData = useSelector(
    (state) => state?.dashboard?.bookedParkingCard
  );
  const [showBookNowPopUp, setShowBookNowPopUp] = useState(false);
  const { paymentSettleUpData, isLoading: paymentLoading } =
    useSelector(paymentStore);
  const { showDrawer } = useSelector(commonStore);
  const { userData, isLoading } = useSelector(loginStore);

  useEffect(() => {
    dispatch(getPaymentSettleUpList({ userId: userData.id }));
  }, [userData]);

  useEffect(() => {
    let settleAmount = 0;
    if (paymentSettleUpData?.length > 0)
      paymentSettleUpData.map((data) => (settleAmount += data?.amountToSettle));
    setSettleAmount(Number(settleAmount.toFixed(2)));
  }, [paymentSettleUpData]);

  const rowData = useMemo(() => {
    let res = [];
    if (bookedParkingCardData) {
      bookedParkingCardData.forEach((cardInfo, index) => {
        res.push([
          index,
          `${capitalizeWords(cardInfo.user.name)}`,
          cardInfo.cardId,
          cardInfo.startDate.slice(11, 16) +
            " - " +
            cardInfo.endDate.slice(11, 16),
        ]);
      });
    } else {
      res = [
        [1, "Person 1", 1, "09:00 - 18:00"],
        [2, "Person 2", 2, "09:00 - 18:00"],
        [3, "Person 3", 3, "09:00 - 18:00"],
        [4, "Person 4", 4, "09:00 - 18:00"],
      ];
    }
    return res;
  }, [bookedParkingCardData]);

  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "S.No" },
      { title: "User ID" },
      { title: "Card Number" },
      { title: "Timing" },
    ],
  };

  const chartData = [
    { title: "Jan", value: 90 },
    { title: "Feb", value: 85 },
    { title: "Mar", value: 80 },
    { title: "Apr", value: 75 },
    { title: "May", value: 80 },
    { title: "Jun", value: 50 },
    { title: "Jul", value: 45 },
    { title: "Aug", value: 30 },
  ];

  const handleBookNow = () => {
    setShowBookNowPopUp(true);
  };

  useEffect(() => {
    dispatch(bookedParkingCard());
  }, []);

  const usedCards = useMemo(() => {
    if (!bookedParkingCardData) {
      return 0;
    }
    const obj = {};
    bookedParkingCardData.forEach((card, index) => {
      if (isCurrentDateTimeInRange(card.startDate, card.endDate)) {
        obj[card.cardId] = 0;
      }
    });
    return Object.keys(obj).length;
  }, [bookedParkingCardData]);

  return (
    <>
      {(isLoading || paymentLoading) && <Loader />}
      <NavBar />
      <BookPopUp
        showPopUp={showBookNowPopUp}
        setShowPopUp={setShowBookNowPopUp}
      />
      <div
        className={`Home_wrapper main_background Drawer_animation ${
          showDrawer && "Drawer_opened"
        }`}
      >
        <div className="Home_row_1">
          <div className="Home_nav_wrapper">
            <div className="Home_show">
              <div className="Home_card Home_card_1">
                <div className="Home_card_title">Total Available</div>
                <div className="Home_card_value">{5 - usedCards} Cards</div>
              </div>
              <div className="Home_card Home_card_3">
                <div className="Home_card_title">Amount to be received</div>
                <div className="Home_card_value">{settleAmount} DHS</div>
              </div>
            </div>
            <div>
              <div className="Home_card_2" onClick={handleBookNow}>
                <button className="btn btn-primary Book_now_button">
                  <AddCircleOutlineIcon fontSize="large" /> <div>Book Now</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Home_row_2">
          <div className="Home_table_wrapper">
            <BasicTable data={tableData} rowData={rowData} />
          </div>
          <div className="Home_chart_wrapper">
            <div className="Home_chart_content">
              <BarChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
