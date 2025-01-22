import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App bg-gray-50">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
