import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./assets/theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
