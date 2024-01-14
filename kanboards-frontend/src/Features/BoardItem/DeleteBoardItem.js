import { IconButton, Box, Dialog, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBoardItem } from "../Column/handleAddDeleteBoardItem";
import { GlobalContext } from "../../Store/GlobalProvider";
import React, { useContext, useState } from "react";

const DeleteBoardItem = ({ column, boardItem }) => {
  const [open, setOpen] = useState(false);
  const globalData = useContext(GlobalContext);
  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} sx={{ marginTop: "50px" }}>
        <Typography variant="body1" sx={{ ml: 2, mr: 2, mt: 1, mb: 2 }}>
          Are you sure you want to delete this item?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => deleteBoardItem(globalData, column, boardItem)}
            color="primary"
          >
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
export default DeleteBoardItem;
