import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import Typography from "@mui/material/Typography";
import Copyright from "../Copyright/Copyright";
import { TOP_MARGIN } from "../../Data/globalConstants";
import { useAuth } from "../../Firebase/AuthContext";
import Alert from "@mui/material/Alert";
import { addUserToDb } from "../ApiClient/crudOperations";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

const Register = () => {
  const { signup, deleteCurrentUser } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    signup(formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        //deleteCurrentUser is passed in case the user could not be added to the database
        addUserToDb(user.uid, navigate, deleteCurrentUser, setError);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to create an account");
        setLoading(false);
        console.log(error);
      });
  };

  const obj = useOutletContext();
  useEffect(() => {
    obj.setPage(obj.pages.REGISTER);
  });

  return (
    <Grid
      container
      sx={{ mt: `${TOP_MARGIN}px` }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={10} sm={4}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <ViewKanbanIcon sx={{ mt: 2 }} color="primary" fontSize="large" />
          </Grid>
          <Grid item sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Grid>
        </Grid>
        {error && <Alert color="warning">{error}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                //id="email"
                label="Email Address"
                //name="email"
                type="text"
                //autoComplete="email-address"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                autoFocus
              />

            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 6 }}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={formValues.confirmPassword}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Link to="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Copyright />
    </Grid>
  );
};

export default Register;
