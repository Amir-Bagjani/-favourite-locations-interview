import React from "react";
import ReactDOM from "react-dom";
import { LocationContextProvider } from "./context/LocationContext";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
