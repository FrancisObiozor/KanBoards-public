import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./navigationBarStyles.js";
import { Outlet } from "react-router-dom";
import { PAGE_LIST } from "../../App/PageList.js";
import NavBarLink from "./NavBarLink.js";
import Logo from "./Logo.js";
import Welcome from "./Welcome.js";

const NavigationBar = () => {
  const [page, setPage] = useState(PAGE_LIST.LOGIN);

  let logo = <div></div>;
  let links = <div></div>;
  if (page === "LOGIN" || page === "REGISTER" || page === "LOGOUT") {
    logo = <Logo link="/" />;
    links = (
      <Box sx={{ ...styles.linkContainer }}>
        <NavBarLink link="/" title="Login" />
        <NavBarLink link="/register" title="Register" />
      </Box>
    );
  } else {
    logo = <Logo link="/home" />;
    links = (
      <Box sx={{ ...styles.linkContainer }}>
        <Box sx={{ display: "flex", gap: "20px", flexGrow: 1 }}>
          <NavBarLink link="/home" title="Home" />
          <NavBarLink link="/settings" title="Settings" />
        </Box>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Welcome />
          <NavBarLink link="/logout" title="Logout" />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1400 }}>
        <Toolbar>
          {logo}
          {links}
        </Toolbar>
      </AppBar>
      <Outlet context={{ setPage: setPage, pages: PAGE_LIST }} />
    </>
  );
};

export default NavigationBar;
