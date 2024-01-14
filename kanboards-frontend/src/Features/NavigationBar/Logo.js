import React from "react";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./navigationBarStyles.js";
import "./navigationBarStyles.css";

const Logo = ({ link }) => {
  return (
    <Link to={link} className="link">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ViewKanbanIcon sx={{ ...styles.logoIcon }} />
        <Typography
          variant="h4"
          align="center"
          sx={{ ...styles.logoTypography }}
        >
          KanBoards
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
