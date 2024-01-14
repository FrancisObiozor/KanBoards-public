import React from "react";
import { Link } from "react-router-dom";
import "./navigationBarStyles.css";
import styles from "./navigationBarStyles.js";
import Typography from "@mui/material/Typography";

const NavBarLink = ({ link, title }) => {
  return (
    <Link to={link} className="link">
      <Typography variant="h6" sx={styles.linkTypography}>
        {title}
      </Typography>
    </Link>
  );
};

export default NavBarLink;
