import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import loginReducer from "./pages/Login/redux/LoginSlice";
import signupReducer from "./pages/SignUp/redux/SignupSlice";
import paymentReducer from "./pages/Payment/redux/PaymentSlice";
import dashboardReducer from "./pages/Home/redux/HomeSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    signup: signupReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
  },
});
