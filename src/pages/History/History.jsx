import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./History.css";
import BasicTable from "../../components/Table/Table";
import { commonStore } from "../../commonSlice";
import { useSelector } from "react-redux";

const History = () => {
  const [rowData, setRowData] = useState([
    [1, "Person 1", 1, 100],
    [2, "Person 2", 2, 200],
    [3, "Person 3", 3, 300],
    [4, "Person 4", 4, 400],
  ]);
  const { showDrawer } = useSelector(commonStore);
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
  };

  return (
    <>
      <NavBar />
      <div
        className={`History_wrapper main_background ${
          showDrawer ? "Drawer_opened" : ""
        }`}
      >
        <div className="History_row">
          <div className="History_table_wrapper">
            <BasicTable data={tableData} rowData={rowData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
