import React, { useEffect, useState } from "react";
import "./CheckAvailability.css";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import {
  getBookingAvailability,
  resetBookingAvailability,
} from "../redux/BookPopUpSlice";
import dayjs from "dayjs";

function isDateInPast(dateString) {
  const date = dayjs(dateString);
  const currentDate = dayjs();
  return date.isBefore(currentDate);
}

function isEndDateBeforeOrEqualStartDate(startDate, endDate) {
  const startDateObj = dayjs(startDate);
  const endDateObj = dayjs(endDate);
  return endDateObj.isBefore(startDateObj) || endDateObj.isSame(startDateObj);
}

const CheckAvailability = ({ setSection }) => {
  const dispatch = useDispatch();
  const [singleDaySelected, setSingleDaySelected] = useState(false);
  const [startDate, setStartDate] = useState(dayjs("2023-09-04"));
  const [startTime, setStartTime] = useState(
    dayjs().hour(1).minute(0).second(0)
  );
  const [endDate, setEndDate] = useState(dayjs("2023-09-10"));
  const [endTime, setEndTime] = useState(dayjs().hour(23).minute(0).second(0));
  // const [singleDaySelected, setSingleDaySelected] = useState(true);
  // const [startDate, setStartDate] = useState(null);
  // const [startTime, setStartTime] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [endTime, setEndTime] = useState(null);
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [touched, setTouched] = useState(false);

  const resetForm = () => {
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    setTouched(false);
    setStartError("");
    setEndError("");
  };

  const validateStartDateTime = (startDate, startTime) => {
    let newStartError = "";
    if (!startDate || !startTime) {
      newStartError = "Start Date & Time is required";
    } else {
      const startDateTime = formatDateAndTime(startDate, startTime);
      if (isDateInPast(startDateTime)) {
        newStartError = "Start Date & Time should not be in the past";
      }
    }
    setStartError(newStartError);
    return !newStartError;
  };

  const validateEndDateTime = (endDate, endTime) => {
    let newEndError = "";
    if (!endDate || !endTime) {
      newEndError = "End Date & Time is required";
    } else {
      const startDateTime = formatDateAndTime(startDate, startTime);
      const endDateTime = formatDateAndTime(endDate, endTime);
      if (isEndDateBeforeOrEqualStartDate(startDateTime, endDateTime)) {
        newEndError =
          "End Date & Time should not be less than or equal to Start Date & Time";
      }
    }
    setEndError(newEndError);
    return !newEndError;
  };

  const formatDateAndTime = (date, time) => {
    if (!date || !time) {
      return "";
    }
    return date.format("YYYY-MM-DD") + time.toISOString().slice(10);
  };

  const handleShowAvailability = () => {
    setTouched(true);
    const startValidation = validateStartDateTime(startDate, startTime);
    const endValidation = validateEndDateTime(endDate, endTime);
    if (!(startValidation && endValidation)) {
      return;
    }
    const startDateTime = formatDateAndTime(startDate, startTime);
    const endDateTime = formatDateAndTime(endDate, endTime);
    dispatch(
      getBookingAvailability({
        startDateTime,
        endDateTime,
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
          <div className="CheckAvailability_label">Start Date & Time</div>
          <div className="CheckAvailability_date_time_wrapper">
            <DatePicker
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
                if (touched) {
                  validateStartDateTime(newValue, startTime);
                }
                if (singleDaySelected) {
                  setEndDate(newValue);
                }
              }}
            />
            <MobileTimePicker
              orientation="landscape"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
                if (touched) {
                  validateStartDateTime(startDate, newValue);
                }
              }}
            />
          </div>
          <div className="invalid-feedback">{startError}</div>
        </div>
        <div className="CheckAvailability_field_wrapper">
          <div className="CheckAvailability_label">End Date & Time</div>
          <div className="CheckAvailability_date_time_wrapper">
            <DatePicker
              disabled={singleDaySelected}
              value={singleDaySelected ? startDate : endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
                if (touched) {
                  validateEndDateTime(newValue, endTime);
                }
              }}
            />
            <MobileTimePicker
              orientation="landscape"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
                if (touched) {
                  validateEndDateTime(endDate, newValue);
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
