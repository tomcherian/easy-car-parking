import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import loginReducer from "./pages/Login/redux/LoginSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
  },
});
