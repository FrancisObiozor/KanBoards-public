import React from "react";
import { Typography } from "@mui/material";
import { editTitle } from "./handleBoardTitleChange.js";

const BoardTitle = ({ board, setIsEditing }) => {
  return (
    <Typography
      onClick={() => editTitle(setIsEditing)}
      variant="h4"
      align="center"
    >
      {board.title}
    </Typography>
  );
};

export default BoardTitle;
