import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicTable from "../../components/Table/Table";
import BarChart from "../../components/BarChart/BarChart";
import BookPopUp from "../../components/BookPopUp/BookPopUp";
import { useDispatch, useSelector } from "react-redux";
import { bookedParkingCard } from "./redux/HomeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const bookedParkingCardData = useSelector(
    (state) => state?.dashboard?.bookedParkingCard
  );
  const [showBookNowPopUp, setShowBookNowPopUp] = useState(false);
  const rowData = useMemo(() => {
    let res = [];
    if (bookedParkingCardData) {
      bookedParkingCardData.forEach((cardInfo, index) => {
        res.push([index, `User ${cardInfo.userId}`, cardInfo.cardId]);
      });
    } else {
      res = [
        [1, "Person 1", 1],
        [2, "Person 2", 2],
        [3, "Person 3", 3],
        [4, "Person 4", 4],
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
      { title: "Card Number", align: "right" },
    ],
  };

  const chartData = [
    { title: "Jan", value: 80 },
    { title: "Feb", value: 20 },
    { title: "Mar", value: 40 },
    { title: "Apr", value: 10 },
    { title: "May", value: 100 },
    { title: "Jun", value: 130 },
    { title: "Jul", value: 60 },
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
    bookedParkingCardData.forEach((card) => {
      obj[card.cardId] = 0;
    });
    return Object.keys(obj).length;
  }, [bookedParkingCardData]);

  return (
    <>
      <NavBar />
      <BookPopUp
        showPopUp={showBookNowPopUp}
        setShowPopUp={setShowBookNowPopUp}
      />
      <div className="Home_wrapper main_background">
        <div className="Home_row_1">
          <div className="Home_card Home_card_1">
            <div className="Home_card_title">Total Available</div>
            <div className="Home_card_value">{5 - usedCards} Cards</div>
          </div>
          <div className="Home_card Home_card_2" onClick={handleBookNow}>
            <div className="Home_card_add_icon">
              <AddCircleOutlineIcon fontSize="large" />
            </div>
            <div>Book Now</div>
          </div>
          <div className="Home_card Home_card_3">
            <div className="Home_card_title">Balance</div>
            <div className="Home_card_value">170 DHS</div>
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
