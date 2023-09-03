import React, { useState } from "react";
import "./FinalizeAvailability.css";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import _ from "lodash";
import { useDispatch } from "react-redux";

function isEndTimeBeforeStartTime(startTime, endTime) {
  const startTimeObj = dayjs(startTime);
  const endTimeObj = dayjs(endTime);
  console.log(startTime, endTime);
  return endTimeObj.isBefore(startTimeObj);
}

const FinalizeAvailability = ({ finalSlots, setSection }) => {
  const dispatch = useDispatch();
  const [slots, setSlots] = useState(_.cloneDeep(finalSlots));

  const handleBook = () => {
    setSection(1);
  };
  return (
    <div className="FinalizeAvailability_wrapper">
      <div className="FinalizeAvailability_heading">Finalize Slots</div>
      <div className="FinalizeAvailability_slots_wrapper">
        {slots.map((slot, index) => {
          return (
            <div className="FinalizeAvailability_slot_wrapper">
              <div className="FinalizeAvailability_slot_date">
                {slot.startDate.slice(0, 10)}
              </div>
              <div className="FinalizeAvailability_time_range">
                <MobileTimePicker
                  ampm={false}
                  orientation="landscape"
                  value={dayjs(slot.startDate)}
                  minTime={dayjs(finalSlots[index].startDate)}
                  maxTime={dayjs(finalSlots[index].endDate)}
                  onChange={(newValue) => {
                    setSlots((prevSlots) => {
                      prevSlots[index].startDate = newValue.toISOString();
                      return [...prevSlots];
                    });
                  }}
                />
                <div>-</div>
                <MobileTimePicker
                  ampm={false}
                  orientation="landscape"
                  value={dayjs(slot.endDate)}
                  minTime={dayjs(finalSlots[index].startDate)}
                  maxTime={dayjs(finalSlots[index].endDate)}
                  onChange={(newValue) => {
                    setSlots((prevSlots) => {
                      prevSlots[index].endDate = newValue.toISOString();
                      if (
                        isEndTimeBeforeStartTime(
                          prevSlots[index].startDate,
                          newValue
                        )
                      ) {
                        console.log("here");
                        prevSlots[index].startDate = newValue.toISOString();
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
