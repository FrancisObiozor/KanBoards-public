import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button, Box, Link, Tooltip, IconButton } from "@mui/material";
import { cancelEdit } from "./handleBoardTitleChange.js";
import BoardTitle from "./BoardTitle.js";
import EditBoardTitle from "./EditBoardTitle.js";
import { GlobalContext } from "../../Store/GlobalProvider";
import { addColumn } from "./handleAddDeleteColumn.js";
import { deleteBoard } from "../BoardListDrawer/handleAddDeleteBoard.js";
import DeleteIcon from "@mui/icons-material/Delete";

const propTypes = {
  styles: PropTypes.object.isRequired,
};

const FirstColumn = ({ board, provided, styles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const globalData = useContext(GlobalContext);

  useEffect(() => {
    const clickOutsideTitleInput = (e) => {
      if (isEditing && e.target.tagName !== "INPUT") {
        cancelEdit(setIsEditing);
      }
    };

    if (isEditing) {
      document.addEventListener("click", clickOutsideTitleInput);
    }

    return () => {
      document.removeEventListener("click", clickOutsideTitleInput);
    };
  }, [isEditing, board]);
  return (
    <Box sx={styles.firstColumn}>
      <Box
        sx={styles.boardTitle}
        display="flex"
        justifyContent="center"
        {...provided.dragHandleProps}
      >
        <ViewKanbanIcon fontSize="large" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isEditing ? (
            <EditBoardTitle boardId={board.id} setIsEditing={setIsEditing} />
          ) : (
            <BoardTitle board={board} setIsEditing={setIsEditing} />
          )}
        </Box>
        <ViewKanbanIcon fontSize="large" />
      </Box>
      <Box textAlign="center">
        <Link href="#contained-buttons">
          <Button
            variant="contained"
            sx={styles.button}
            endIcon={<AddBoxOutlinedIcon />}
            onClick={() => addColumn(globalData, board)}
          >
            New Column
          </Button>
        </Link>
      </Box>

      {board.columnIds.length === 0 ? (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Delete Board" placement="bottom">
            <IconButton onClick={() => deleteBoard(globalData, board)} sx={{}}>
              <DeleteIcon sx={{ color: "black", fontSize: "6rem" }} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

FirstColumn.propTypes = propTypes;

export default FirstColumn;
