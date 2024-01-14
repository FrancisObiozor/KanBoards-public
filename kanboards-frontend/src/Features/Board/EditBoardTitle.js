import React, { useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import styles from "./boardStyles.js";
import {
  titleChange,
  saveTitle,
  cancelEdit,
} from "./handleBoardTitleChange.js";
import { GlobalContext } from "../../Store/GlobalProvider";

const EditTitle = ({ boardId, setIsEditing }) => {
  const globalData = useContext(GlobalContext);
  const boardGlobal = globalData.boards[boardId];

  const [title, updateTitle] = useState(boardGlobal.title);
  return (
    <Box>
      <input
        value={title}
        onChange={(e) => titleChange(e, updateTitle)}
        style={styles.titleInput}
      />
      <Box display="flex" justifyContent="center" sx={{ mt: 1, mb: 4 }}>
        <Button
          variant="contained"
          sx={{ mr: "2px" }}
          onClick={() =>
            saveTitle(globalData, boardGlobal, title, setIsEditing)
          }
        >
          Save
        </Button>
        <Button variant="outlined" onClick={() => cancelEdit(setIsEditing)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditTitle;
