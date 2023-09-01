import { Provider } from "react-redux";
import AppRoutes from "./Routes/Routes";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer />
    </Provider>
  );
}

export default App;
