import { Provider } from "react-redux";
import AppRoutes from "./Routes/Routes";
import { store } from "./store";
// import Loading from "./components/Loading/Loading";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      {/* <Loading /> */}
    </Provider>
  );
}

export default App;
