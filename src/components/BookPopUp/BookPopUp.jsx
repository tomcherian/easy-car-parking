import React, { useEffect, useState } from "react";
import "./BookPopUp.css";
import PopUp from "../PopUp/PopUp";
import { useDispatch, useSelector } from "react-redux";
import CheckAvailability from "./CheckAvailability/CheckAvailability";
import ShowAvailability from "./ShowAvailability/ShowAvailability";
import FinalizeAvailability from "./FinalizeAvailability/FinalizeAvailability";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import {
  resetBookingAvailability,
  resetBookingData,
} from "./redux/BookPopUpSlice";
import { Alert, Snackbar } from "@mui/material";

const BookPopUp = ({ showPopUp, setShowPopUp }) => {
  const dispatch = useDispatch();
  const [section, setSection] = useState(1);
  const [finalSlots, setFinalSlots] = useState([]);
  const isLoading = useSelector((state) => state?.bookPopUpSlice?.isLoading);
  const bookingData = useSelector(
    (state) => state?.bookPopUpSlice?.bookingData
  );

  if (isLoading) {
    return <OverlayLoader />;
  }

  const handleSnackBarClose = () => {
    dispatch(resetBookingData());
  };

  return (
    <>
      <PopUp
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        onClose={() => {
          setSection(1);
        }}
      >
        <div className="BookPopUp">
          {section === 1 && <CheckAvailability setSection={setSection} />}
          {section === 2 && (
            <ShowAvailability
              setSection={setSection}
              setFinalSlots={setFinalSlots}
            />
          )}
          {section === 3 && (
            <FinalizeAvailability
              finalSlots={finalSlots}
              setSection={setSection}
              setShowPopUp={setShowPopUp}
            />
          )}
        </div>
      </PopUp>
      {bookingData && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={handleSnackBarClose}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Booking Successful!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default BookPopUp;
