import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import loginReducer from "./pages/Login/redux/LoginSlice";
import signupReducer from "./pages/SignUp/redux/SignupSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});
