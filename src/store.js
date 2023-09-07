import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import loginReducer from "./pages/Login/redux/LoginSlice";
import bookPopUpSlice from "./components/BookPopUp/redux/BookPopUpSlice";
import signupReducer from "./pages/SignUp/redux/SignupSlice";
import paymentReducer from "./pages/Payment/redux/PaymentSlice";
import dashboardReducer from "./pages/Home/redux/HomeSlice";
import updateProfileReducer from "./pages/Profile/redux/ProfileSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    bookPopUpSlice: bookPopUpSlice,
    signup: signupReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
    updateProfile: updateProfileReducer,
  },
});
