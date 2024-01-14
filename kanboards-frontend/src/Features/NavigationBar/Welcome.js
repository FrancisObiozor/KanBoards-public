import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../Firebase/AuthContext";
import styles from "./navigationBarStyles.js";

const Welcome = () => {
  const { getCurrentUser } = useAuth();
  var currentUser = getCurrentUser();
  return (
    <Link to="/settings" className="link">
      <Typography variant="h6" sx={styles.welcome}>
        Welcome, {currentUser.email}
      </Typography>
    </Link>
  );
};

export default Welcome;
