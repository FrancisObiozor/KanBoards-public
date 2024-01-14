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
import DeleteAccountDialog from "./DeleteAccountDialog";

const TabDelete = () => {
  const { getCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (email !== currentUser.email) {
      setMessage("The email you entered was incorrect.");
      setSeverity("error");
    } else {
      setOpenDeleteAccountDialog(true);
      console.log("User Deleted");
    }
    // deleteCurrentUser()
    //   .then(() => {
    //     setMessage("Your account has successfully been closed");
    //     setSeverity("success");
    //   })
    //   .catch((error) => {
    //     setMessage("An error occurred when deleting your account");
    //     setSeverity("error");
    //     console.log(error);
    //   });
  };

  return (
    <CardContent sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="row" justifyContent="center">
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
          <Grid item xs={12} sm={8}>
            <Typography sx={{ mb: 3, fontWeight: "bold" }}>
              Enter your account email address to delete account.
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" sx={{ marginRight: 2 }} type="submit">
                Delete Account
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                <Link to="/home">Home</Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        setOpen={setOpenDeleteAccountDialog}
        setMessage={setMessage}
        setSeverity={setSeverity}
      />
    </CardContent>
  );
};

export default TabDelete;
