import { useState } from "react";

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useAuth } from "../../Firebase/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const TabAccount = () => {
  const { changeEmail, getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [email, setEmail] = useState(currentUser.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    changeEmail(email)
      .then(() => {
        setMessage("You have successfully updated your email");
        setSeverity("success");
      })
      .catch((error) => {
        setMessage("An error occurred when changing your email");
        setSeverity("error");
        console.log(error);
      });
  };

  return (
    <CardContent sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} direction="row" justifyContent="center">
          {message === "" || message === null ? (
            <Grid item xs={7}></Grid>
          ) : (
            <Grid item xs={7}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Alert severity={severity}>
                  <Typography align="center">{message}</Typography>
                </Alert>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="contained" sx={{ marginRight: 2 }} type="submit">
                Save Changes
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                <Link to="/home">Home</Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
