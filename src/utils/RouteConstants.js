import Home from "../pages/Home/Home";

export const FeRoutes = {
  LOGIN: "/login",
  SIGN_UP: "/signup",
  HOME: "/",
};

export const ProtectedRoutesData = [
  {
    path: FeRoutes.HOME,
    component: <Home />,
  },
];
