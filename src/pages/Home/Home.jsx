import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicTable from "../../components/Table/Table";
import BarChart from "../../components/BarChart/BarChart";
import BookPopUp from "../../components/BookPopUp/BookPopUp";

const Home = () => {
  const [showBookNowPopUp, setShowBookNowPopUp] = useState(false);
  const [rowData, setRowData] = useState([
    [1, "Person 1", 1],
    [2, "Person 2", 2],
    [3, "Person 3", 3],
    [4, "Person 4", 4],
  ]);

  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "S.No" },
      { title: "Person" },
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
            <div className="Home_card_value">3 Cards</div>
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
