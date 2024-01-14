import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import Login from "../Features/Login/Login";
import Register from "../Features/Register/Register";
import NavigationBar from "../Features/NavigationBar/NavigationBar";
import Settings from "../Features/Settings/Settings";
import Logout from "../Features/Logout/Logout";
import { getApiKeysAndBackendStatus } from "../Features/ApiClient/crudOperations";
import { setFirebaseSettingsFromBackend } from "../Firebase/Firebase";

const App = () => {
  const [isAppStart, setIsAppStart] = useState(true);

  if (isAppStart) {
    getApiKeysAndBackendStatus()
      .then((response) => {
        console.log("Got keys from backend.")
        const data = response.data;
     
        setFirebaseSettingsFromBackend(data);
      })
      .catch((error) => {
        console.log("Did not get keys from backend. Key are from environment variables.")
        console.log(error);
      });
    setIsAppStart(false);
  }

  return (
    <Routes>
      <Route element={<NavigationBar />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default App;
