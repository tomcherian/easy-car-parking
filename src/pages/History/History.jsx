import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./History.css";
import BasicTable from "../../components/Table/Table";
import { commonStore } from "../../commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginStore } from "../Login/redux/LoginSlice";
import {
  bookingHistoryStore,
  getBookingHistory,
} from "./redux/bookingHistorySlice";
import Loader from "../../components/Loader/Loader";
import { getDateLocalTime } from "../../utils/commonFunctions";

const History = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(loginStore);
  const [rowData, setRowData] = useState([]);
  const { showDrawer } = useSelector(commonStore);
  const { isLoading, bookingCardHistory } = useSelector(bookingHistoryStore);

  useEffect(() => {
    dispatch(getBookingHistory(userData.id));
  }, [userData]);

  useEffect(() => {
    if (bookingCardHistory?.length > 0) {
      const tempRowData = bookingCardHistory.map((data, idx) => [
        idx + 1,
        data.cardId,
        getDateLocalTime(data.time),
        getDateLocalTime(data.startDate),
        getDateLocalTime(data.endDate),
      ]);
      setRowData(tempRowData);
    }
  }, [bookingCardHistory]);

  const tableData = {
    headerBgColor: "rgb(25, 118, 210)",
    headerTextColor: "white",
    oddRowBgColor: "",
    evenRowBgColor: "",
    headers: [
      { title: "Sl.No",align: "center" },
      { title: "Card number", align: "center" },
      { title: "Booking time", align: "left" },
      { title: "Start date", align: "left" },
      { title: "End date", align: "left" },
    ],
  };

  return (
    <>
      <NavBar />
      {isLoading && <Loader />}
      <div
        className={`History_wrapper main_background Drawer_animation ${
          showDrawer && "Drawer_opened"
        }`}
      >
        <div className="History_row">
          <div className="History_table_wrapper">
            <BasicTable data={tableData} rowData={rowData} />
          </div>
          {/* <tableau-viz
            id="tableau-viz"
            src="https://prod-uk-a.online.tableau.com/t/parknow/views/PaymentReport/PaymentDashboard"
            width="1000"
            height="863"
            toolbar="bottom"
          ></tableau-viz> */}
        </div>
      </div>
    </>
  );
};

export default History;
