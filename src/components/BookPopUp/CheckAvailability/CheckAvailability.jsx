import React, { useState } from "react";
import "./CheckAvailability.css";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { getBookingAvailability } from "../redux/BookPopUpSlice";
import dayjs from "dayjs";

function isEndDateBeforeStartDate(startDate, endDate) {
  return endDate.isBefore(startDate);
}

const formatDateWithoutTimeZone = (date) => {
  if (!date) {
    return "";
  }
  return new Date(date.format("YYYY-MM-DD")).toISOString();
};

const CheckAvailability = ({ setSection }) => {
  const dispatch = useDispatch();
  const [singleDaySelected, setSingleDaySelected] = useState(false);
  const [startDate, setStartDate] = useState(dayjs("2023-09-04"));
  const [endDate, setEndDate] = useState(dayjs("2023-09-10"));
  // const [singleDaySelected, setSingleDaySelected] = useState(true);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [touched, setTouched] = useState(false);

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setTouched(false);
    setStartError("");
    setEndError("");
  };

  const validateStartDate = (startDate) => {
    let newStartError = "";
    if (!startDate) {
      newStartError = "Start Date is required";
    }
    setStartError(newStartError);
    return !newStartError;
  };

  const validateEndDate = (endDate) => {
    let newEndError = "";
    if (!endDate) {
      newEndError = "End Date is required";
    } else {
      if (isEndDateBeforeStartDate(startDate, endDate)) {
        newEndError = "End Date should not be less than Start Date ";
      }
    }
    setEndError(newEndError);
    return !newEndError;
  };

  const handleShowAvailability = () => {
    setTouched(true);
    const startValidation = validateStartDate(startDate);
    const endValidation = validateEndDate(endDate);
    if (!(startValidation && endValidation)) {
      return;
    }
    const startDateTime = formatDateWithoutTimeZone(startDate);
    const endDateTime = formatDateWithoutTimeZone(endDate);
    dispatch(
      getBookingAvailability({
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      })
    );
    setSection(2);
  };

  return (
    <div className="CheckAvailability_wrapper">
      <div className="CheckAvailability_heading ">Check Availability</div>
      <div className="CheckAvailability_option_wrapper">
        <div
          className={`CheckAvailability_option ${
            singleDaySelected && "CheckAvailability_option_selected"
          }`}
          onClick={() => {
            setSingleDaySelected(true);
            resetForm();
          }}
        >
          Single Day
        </div>

        <div
          className={`CheckAvailability_option ${
            !singleDaySelected && "CheckAvailability_option_selected"
          }`}
          onClick={() => {
            setSingleDaySelected(false);
            resetForm();
          }}
        >
          Mutli Day
        </div>
      </div>

      <div>
        <div className="CheckAvailability_field_wrapper">
          <div className="CheckAvailability_label">Start Date</div>
          <div className="CheckAvailability_date_time_wrapper">
            <DatePicker
              disablePast={true}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
                if (touched) {
                  validateStartDate(newValue);
                }
                if (singleDaySelected) {
                  setEndDate(newValue);
                }
              }}
            />
          </div>
          <div className="invalid-feedback">{startError}</div>
        </div>
        <div className="CheckAvailability_field_wrapper">
          <div className="CheckAvailability_label">End Date</div>
          <div className="CheckAvailability_date_time_wrapper">
            <DatePicker
              disablePast={true}
              disabled={singleDaySelected}
              value={singleDaySelected ? startDate : endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
                if (touched) {
                  validateEndDate(newValue);
                }
              }}
            />
          </div>
          <div className="invalid-feedback">{endError}</div>
        </div>
        <div className="CheckAvailability_button_wrapper">
          <div
            className="CheckAvailability_button"
            onClick={handleShowAvailability}
          >
            Show Availability
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAvailability;
