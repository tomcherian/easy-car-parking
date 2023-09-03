import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import loginReducer from "./pages/Login/redux/LoginSlice";
import bookPopUpSlice from "./components/BookPopUp/redux/BookPopUpSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    bookPopUpSlice: bookPopUpSlice,
  },
});
