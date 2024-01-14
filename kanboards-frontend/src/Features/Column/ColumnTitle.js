import React from "react";
import { Typography, Box } from "@mui/material";
import { editTitle } from "./handleColumnTitleChange.js";

const ColumnTitle = ({ column, setIsEditing }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          onClick={() => editTitle(setIsEditing)}
          variant="h4"
          color="white"
          align="center"
          sx={{}}
        >
          {column.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default ColumnTitle;
