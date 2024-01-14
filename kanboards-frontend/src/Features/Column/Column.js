import props from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button, List, Box, Tooltip, IconButton } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import BoardItem from "../BoardItem/BoardItem.js";
import styles from "./columnStyles.js";
import ColumnTitle from "./ColumnTitle.js";
import EditColumnTitle from "./EditColumnTitle.js";
import { cancelEdit } from "./handleColumnTitleChange.js";
import { addBoardItem } from "./handleAddDeleteBoardItem.js";
import { deleteColumn } from "../Board/handleAddDeleteColumn.js";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { GlobalContext } from "../../Store/GlobalProvider";
import DeleteIcon from "@mui/icons-material/Delete";

const propTypes = {
  column: props.object.isRequired,
  index: props.number.isRequired,
};

const Column = ({ board, column, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const globalData = useContext(GlobalContext);
  const boardItemIds = globalData.columns[column.id].boardItemIds;
  const boardItems = globalData.boardItems;

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
  }, [isEditing]);

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided) => (
        <Box
          justifyContent="center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box sx={styles.column}>
            {isEditing ? (
              <EditColumnTitle
                columnId={column.id}
                setIsEditing={setIsEditing}
              />
            ) : (
              <ColumnTitle column={column} setIsEditing={setIsEditing} />
            )}

            <Box textAlign="center">
              <Tooltip title="Add New Board Item" placement="bottom">
                <Button
                  onClick={() => addBoardItem(globalData, column)}
                  variant="contained"
                  sx={styles.button}
                  endIcon={<AddBoxOutlinedIcon />}
                >
                  Add Item
                </Button>
              </Tooltip>
            </Box>
            {column.boardItemIds.length === 0 ? (
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Delete Column" placement="bottom">
                  <IconButton
                    onClick={() => deleteColumn(globalData, board, column)}
                    sx={{}}
                  >
                    <DeleteIcon sx={{ color: "white", fontSize: "4rem" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              ""
            )}

            <Droppable droppableId={column.id} type="boardItem">
              {(provided, snapshot) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    bgcolor: styles.changeColorOfDroppableDuringDrag(
                      snapshot.isDraggingOver
                    ),
                  }}
                >
                  {boardItemIds.map((boardItemId, index) => {
                    return (
                      <BoardItem
                        key={index}
                        column={column}
                        boardItem={boardItems[boardItemId]}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

Column.propTypes = propTypes;

export default Column;
