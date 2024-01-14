import React, { useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import styles from "./columnStyles.js";
import {
  titleChange,
  saveTitle,
  cancelEdit,
} from "./handleColumnTitleChange.js";
import { GlobalContext } from "../../Store/GlobalProvider";

const EditColumnTitle = ({ columnId, setIsEditing }) => {
  const globalData = useContext(GlobalContext);
  const columnGlobal = globalData.columns[columnId];
  const [title, updateTitle] = useState(columnGlobal.title);

  return (
    <Box>
      <input
        value={title}
        onChange={(e) => titleChange(e, updateTitle)}
        style={styles.titleInput}
      />
      <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
        <Button
          variant="contained"
          sx={{
            borderStyle: "solid",
            borderRadius: "4px",
            borderWidth: "2px",
            borderColor: "black",
            color: "black",
            fontWeight: "bold",
            backgroundColor: "lightgray",
            mr: "5px",
            minWidth: "100px",
            fontSize: "15px",
            "&:hover": {
              backgroundColor: "gray",
              color: "white",
            },
          }}
          onClick={() =>
            saveTitle(globalData, columnGlobal, title, setIsEditing)
          }
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{
            borderStyle: "solid",
            borderRadius: "5px",
            borderWidth: "2px",
            borderColor: "dimgray",
            color: "dimgray",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: "13px",
            "&:hover": {
              backgroundColor: "lightgray",
              color: "gray",
            },
          }}
          onClick={() => cancelEdit(setIsEditing)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditColumnTitle;
