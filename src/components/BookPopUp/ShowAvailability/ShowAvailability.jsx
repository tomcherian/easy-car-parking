import React, { useMemo, useState } from "react";
import "./ShowAvailability.css";
import { useSelector } from "react-redux";

function areObjectsEqual(slot1, slot2) {
  const keys1 = Object.keys(slot1);
  const keys2 = Object.keys(slot2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (slot1[key] !== slot2[key]) {
      return false;
    }
  }

  return true;
}

const ShowAvailability = ({ setSection, setFinalSlots }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const availableParkingCards = useSelector(
    (state) => state?.bookPopUpSlice?.data?.availableParkingCards
  );

  const availableSlots = useMemo(() => {
    let data = {};
    Object.keys(availableParkingCards).forEach((cardNumber) => {
      availableParkingCards[cardNumber].forEach((availableSlot) => {
        Object.keys(availableSlot.availableSlot).forEach((slot) => {
          availableSlot.availableSlot[slot].forEach((finalSlot) => {
            const day = finalSlot.startDate.slice(0, 10);
            if (data[day]) {
              let insert = true;
              data[day].forEach((record) => {
                if (
                  record.startDate === finalSlot.startDate &&
                  record.endDate === finalSlot.endDate
                ) {
                  insert = false;
                }
              });
              if (insert) {
                data[day].push({
                  startDate: finalSlot.startDate.replace("Z", ""),
                  endDate: finalSlot.endDate.replace("Z", ""),
                  cardNumber,
                });
              }
            } else {
              data[day] = [
                {
                  startDate: finalSlot.startDate.replace("Z", ""),
                  endDate: finalSlot.endDate.replace("Z", ""),
                  cardNumber,
                },
              ];
            }
          });
        });
      });
    });
    return data;
  }, [availableParkingCards]);

  const findSlotIndex = (slot) => {
    return selectedSlots.findIndex((currentSlot) =>
      areObjectsEqual(currentSlot, slot)
    );
  };

  const handleSlotClick = (slot) => {
    const index = findSlotIndex(slot);
    if (index !== -1) {
      setSelectedSlots(
        selectedSlots.filter(
          (currentSlot) => !areObjectsEqual(slot, currentSlot)
        )
      );
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleProceed = () => {
    if (selectedSlots.length === 0) {
      return;
    }
    setFinalSlots(selectedSlots);
    setSection(3);
  };
  if (Object.keys(availableSlots).length === 0) {
    return (
      <div className="ShowAvailability_wrapper">
        <div className="ShowAvailability_heading ">Available Slots</div>
        <div className="ShowAvailability_description">
          Sorry! No Slots Available
        </div>
      </div>
    );
  }

  return (
    <div className="ShowAvailability_wrapper">
      <div className="ShowAvailability_heading ">Available Slots</div>
      <div className="ShowAvailability_day_wrapper">
        {Object.keys(availableSlots).map((date) => {
          return (
            <div>
              <div className="ShowAvailability_date">
                {new Date(date).toString().slice(4, 15)}
              </div>
              <div className="ShowAvailability_slots_wrapper">
                {availableSlots[date].map((slot) => {
                  return (
                    <div
                      className={`ShowAvailability_slot ${
                        findSlotIndex(slot) !== -1 &&
                        "ShowAvailability_slot_selected"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.startDate.slice(11, 16)}-
                      {slot.endDate.slice(11, 16)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="ShowAvailability_button_wrapper">
        <div
          className={`ShowAvailability_button ${
            selectedSlots.length === 0 && "ShowAvailability_button_disabled"
          }`}
          onClick={handleProceed}
        >
          Proceed
        </div>
      </div>
    </div>
  );
};

export default ShowAvailability;
