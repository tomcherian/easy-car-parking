import React, { useEffect, useState } from "react";
import "./FinalizeAvailability.css";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { bookParking, resetBookingData } from "../redux/BookPopUpSlice";

const FinalizeAvailability = ({ finalSlots, setSection, setShowPopUp }) => {
  const dispatch = useDispatch();
  const [slots, setSlots] = useState(_.cloneDeep(finalSlots));
  const userId = useSelector((state) => state?.login?.userData?.id);
  const bookingData = useSelector(
    (state) => state?.bookPopUpSlice?.bookingData
  );

  useEffect(() => {
    if (bookingData) {
      setShowPopUp(false);
      setSection(1);
    }
  }, [bookingData]);

  const handleBook = () => {
    const data = slots.map((slot) => {
      return {
        userId: userId,
        time: new Date().toISOString(),
        startDate: dayjs(slot.startDate).format("YYYY-MM-DDTHH:mm:ss") + "Z",
        endDate: dayjs(slot.endDate).format("YYYY-MM-DDTHH:mm:ss") + "Z",
        parkedLocation: "",
        cardId: slot.cardNumber,
      };
    });
    console.log({ data });
    dispatch(bookParking(data));
  };

  return (
    <div className="FinalizeAvailability_wrapper">
      <div className="FinalizeAvailability_heading">Finalize Slots</div>
      <div className="FinalizeAvailability_slots_wrapper">
        {slots.map((slot, index) => {
          return (
            <div className="FinalizeAvailability_slot_wrapper">
              <div className="FinalizeAvailability_slot_date">
                {dayjs(slot.startDate).format("YYYY-MM-DD")}
              </div>
              <div className="FinalizeAvailability_time_range">
                <MobileTimePicker
                  ampm={false}
                  orientation="landscape"
                  value={dayjs(slot.startDate)}
                  minTime={dayjs(finalSlots[index].startDate)}
                  maxTime={dayjs(slots[index].endDate).subtract(1, "minute")}
                  onChange={(newValue) => {
                    setSlots((prevSlots) => {
                      prevSlots[index].startDate = newValue;
                      if (newValue.isAfter(dayjs(prevSlots[index].endDate))) {
                        prevSlots[index].endDate = newValue;
                      }
                      return [...prevSlots];
                    });
                  }}
                />
                <div>-</div>
                <MobileTimePicker
                  ampm={false}
                  orientation="landscape"
                  value={dayjs(slot.endDate)}
                  minTime={dayjs(slots[index].startDate).add(1, "minute")}
                  maxTime={dayjs(finalSlots[index].endDate)}
                  onChange={(newValue) => {
                    setSlots((prevSlots) => {
                      prevSlots[index].endDate = newValue;
                      if (
                        newValue.isBefore(dayjs(prevSlots[index].startDate))
                      ) {
                        prevSlots[index].startDate = newValue;
                      }
                      console.log(prevSlots);
                      return [...prevSlots];
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="FinalizeAvailability_button_wrapper">
        <div className="FinalizeAvailability_button" onClick={handleBook}>
          Confirm Booking
        </div>
      </div>
    </div>
  );
};

export default FinalizeAvailability;
