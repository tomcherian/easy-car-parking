import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Payment from "../pages/Payment/Payment";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import { AllRoutes } from "../utils/RouteConstants";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const store = useSelector((state) => state);
  console.log({ store });
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={AllRoutes.HOME} element={<ProtectedRoute />}>
          <Route exact path={AllRoutes.HOME} element={<Home />} />
        </Route>
        <Route exact path={AllRoutes.PAYMENTS} element={<ProtectedRoute />}>
          <Route exact path={AllRoutes.PAYMENTS} element={<Payment />} />
        </Route>
        <Route exact path={AllRoutes.HISTORY} element={<ProtectedRoute />}>
          <Route exact path={AllRoutes.HISTORY} element={<History />} />
        </Route>
        <Route exact path={AllRoutes.PROFILE} element={<ProtectedRoute />}>
          <Route exact path={AllRoutes.PROFILE} element={<Profile />} />
        </Route>
        <Route path={AllRoutes.LOGIN} element={<Login />} />
        <Route path={AllRoutes.SIGN_UP} element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
