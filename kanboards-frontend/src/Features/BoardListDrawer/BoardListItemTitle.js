import React from "react";
import { Typography } from "@mui/material";
import { editTitle } from "./handleBoardListItemTitleChange.js";

const BoardListItemTitle = ({ board, setIsEditing }) => {
  return (
    <Typography
      onClick={() => editTitle(setIsEditing)}
      variant="h6"
      align="center"
    >
      {board.title}
    </Typography>
  );
};

export default BoardListItemTitle;
