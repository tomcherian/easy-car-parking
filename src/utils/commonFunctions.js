import moment from "moment/moment";

export const getUserData = (userId, userArray) => {
  return userArray?.find((data) => data.id === userId);
};

export const localTime = (dateTime) => {
  let date = new Date(dateTime);
  const dateObject = new Date(date.toString());
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${amOrPm}`;
  return formattedTime;
};

export const getDateLocalTime = (dateTime) => {
  let date = new Date(dateTime);
  let localDate = moment(dateTime).format("ll");
  const dateObject = new Date(date.toString());
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedDateTime = `${localDate} ${formattedHours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
  return formattedDateTime;
};
