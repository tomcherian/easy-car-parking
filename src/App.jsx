import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { FeRoutes, ProtectedRoutesData } from "./utils/RouteConstants";
import NotFound from "./pages/NotFound/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

function App() {
  const ProtectedRoutes = () => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      return ProtectedRoutesData.map((routeData) => {
        return <Route path={routeData.path} element={routeData.component} />;
      });
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {ProtectedRoutes()}
        <Route path={FeRoutes.LOGIN} element={<Login />} />
        <Route path={FeRoutes.SIGN_UP} element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
