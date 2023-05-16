import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./assets/global.css";
axios.defaults.baseURL = "http://localhost:3000";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_ID_CLIENT}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>      
    </Provider>
  </React.StrictMode>
);
