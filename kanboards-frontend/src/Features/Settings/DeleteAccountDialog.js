import { Box, Dialog, Button, Typography } from "@mui/material";
import { GlobalContext } from "../../Store/GlobalProvider";
import React, { useContext } from "react";
import { useAuth } from "../../Firebase/AuthContext";
import { deleteUserFromDb } from "./../ApiClient/crudOperations";
import { useNavigate } from "react-router-dom";

const DeleteAccountDialog = ({ open, setOpen, setMessage, setSeverity }) => {
  const globalData = useContext(GlobalContext);
  const { deleteCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    //delete user from firebase
    deleteCurrentUser()
      .then(() => {
        //deletes user from database then navigates to login page
        deleteUserFromDb(globalData.user.authId, navigate);
        console.log("Account successfully delete from firebase!");
      })
      .catch((error) => {
        setOpen(false);
        setMessage("There was an error when deleting your account.");
        setSeverity("error");
        console.log(error);
      });
  };

  return (
    <Box>
      <Dialog open={open} sx={{ marginTop: "50px" }}>
        <Typography variant="body1" sx={{ ml: 2, mr: 2, mt: 1, mb: 2 }}>
          Are you sure you want to delete your account?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => handleDeleteAccount()} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)} sx={{ color: "gray" }}>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
export default DeleteAccountDialog;
