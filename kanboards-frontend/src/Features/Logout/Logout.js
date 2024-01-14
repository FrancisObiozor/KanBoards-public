import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../Firebase/AuthContext";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { TOP_MARGIN } from "../../Data/globalConstants";
import Box from "@mui/material/Box";

const Logout = () => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const obj = useOutletContext();
  useEffect(() => {
    obj.setPage(obj.pages.LOGOUT);
  });

  const { logout } = useAuth();

  logout()
    .then(() => {
      setMessage("You have successfully logged out");
      setSeverity("success");
    })
    .catch((error) => {
      setMessage("There was an error with logging out");
      setSeverity("error");
      console.log(error);
    });

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ mt: `${TOP_MARGIN}px` }}
    >
      <Grid item xs={7}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Alert severity={severity}>
            <Typography align="center">{message}</Typography>
          </Alert>
        </Box>
      </Grid>
      <Grid item xs={7} sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h3">
          Logout
        </Typography>
      </Grid>
      <Grid item xs={7} sx={{ textAlign: "center", mt: 5 }}>
        <Link to="/" variant="body2">
          Return to Login
        </Link>
      </Grid>
    </Grid>
  );
};

export default Logout;
