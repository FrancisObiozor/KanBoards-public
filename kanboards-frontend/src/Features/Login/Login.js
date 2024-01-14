import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Copyright from "../Copyright/Copyright";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import SideImage from "./SideImage";
import { useAuth } from "../../Firebase/AuthContext";
import Alert from "@mui/material/Alert";
import { GlobalContext } from "../../Store/GlobalProvider";
import {
  getUserFromDb,
  getApiKeysAndBackendStatus,
} from "../ApiClient/crudOperations";

const Login = () => {
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const globalData = useContext(GlobalContext);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    login(formValues.email, formValues.password)
      .then((userCredential) => {
        const userCredentials = userCredential.user;
        getUserFromDb(userCredentials.uid, navigate, globalData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to sign in");
        setLoading(false);
      });
  };
  const obj = useOutletContext();
  useEffect(() => {
    obj.setPage(obj.pages.LOGIN);
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <SideImage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ViewKanbanIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Alert color="warning">{error}</Alert>}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Grid item sx={{ mt: 1 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item sx={{ mt: 3 }}>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Copyright />
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
