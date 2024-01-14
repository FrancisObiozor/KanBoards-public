import React from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalProvider } from "./Store/GlobalProvider";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Firebase/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </AuthProvider>,
  document.getElementById("root")
);
