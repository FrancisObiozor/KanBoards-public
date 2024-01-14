import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useAuth } from "../../Firebase/AuthContext";

const TabSecurity = () => {
  const [values, setValues] = useState({
    newPassword: "",
    currentPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  const { changePassword, verifyExistingPassword } = useAuth();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  // Handle Current Password
  const handleCurrentPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  // Handle New Password
  const handleNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    verifyExistingPassword(values.currentPassword)
      .then((result) => {
        setNewPassword();
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        setSeverity("error");
        setMessage("Current Password is incorrect");
      });
  };

  const setNewPassword = () => {
    if (values.newPassword !== values.confirmNewPassword) {
      setSeverity("error");
      return setMessage("Passwords do not match");
    }

    if (values.newPassword === null || values.newPassword === "") {
      setSeverity("error");
      return setMessage("No new password was entered");
    }

    changePassword(values.newPassword)
      .then(() => {
        setMessage("You have successfully updated your password");
        setSeverity("success");
      })
      .catch((error) => {
        setMessage("An error occurred when changing your password");
        setSeverity("error");
        console.log(error);
      });
  };

  return (
    <CardContent sx={{ paddingBottom: 0, mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid justifyContent="center" container spacing={4}>
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
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    label="Current Password"
                    value={values.currentPassword}
                    id="account-settings-current-password"
                    type={values.showCurrentPassword ? "text" : "password"}
                    onChange={handleCurrentPasswordChange("currentPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrentPassword}
                        >
                          {values.showCurrentPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-new-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    label="New Password"
                    value={values.newPassword}
                    id="account-settings-new-password"
                    onChange={handleNewPasswordChange("newPassword")}
                    type={values.showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowNewPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showNewPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-confirm-new-password">
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    id="account-settings-confirm-new-password"
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    onChange={handleConfirmNewPasswordChange(
                      "confirmNewPassword"
                    )}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 11, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                type="submit"
              >
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

export default TabSecurity;
