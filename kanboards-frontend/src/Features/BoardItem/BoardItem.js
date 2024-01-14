import props from "prop-types";
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import EditBoardItem from "./EditBoardItem";
import React, { useContext } from "react";
import ViewBoardItemDetails from "./ViewBoardItemDetails.js";
import styles from "./boardItemStyles.js";
import { format } from "date-fns";
import DeleteBoardItem from "./DeleteBoardItem.js";
import { GlobalContext } from "../../Store/GlobalProvider";
import { updateUserInDb } from "./../ApiClient/crudOperations";

const propTypes = {
  boardItem: props.object.isRequired,
  index: props.number.isRequired,
};

const BoardItem = ({ column, boardItem, index }) => {
  const currentDate = format(boardItem.dueDate, "MM/dd/yyyy");
  const globalData = useContext(GlobalContext);

  const handleChange = (event) => {
    const isCheck = event.target.checked;
    globalData.boardItems[boardItem.id].isDone = isCheck;
    globalData.updateBoardItems(globalData.boardItems);
    updateUserInDb(globalData.user);
  };

  return (
    <Draggable key={boardItem.id} draggableId={boardItem.id} index={index}>
      {(provided, snapshot) => (
        <Box
          sx={{
            ...styles.boardItem,
            bgcolor: styles.changeBgColorOfBoardItem(
              snapshot.isDragging,
              boardItem.isDone
            ),
          }}
          key={boardItem.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box sx={{ ml: 1 }}>
              <ListItem disablePadding={true} sx={{ mr: 1 }}>
                <ListItemText
                  primary={boardItem.title}
                  primaryTypographyProps={styles.boardItemTextPrimary}
                  secondary={`Due: ${currentDate}`}
                  secondaryTypographyProps={styles.boardItemTextSecondary}
                />
              </ListItem>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1, mr: 1 }}>
                <Typography variant="body2" sx={{ fontSize: "17px", mr: 1 }}>
                  Complete?
                </Typography>
                <Checkbox
                  checked={boardItem.isDone}
                  onChange={handleChange}
                  sx={{ padding: 0 }}
                />
              </Box>
              <ViewBoardItemDetails boardItem={boardItem} />
            </Box>

            <Box
              sx={{
                ml: 3,
                position: "relative",
                top: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{}}>
                <EditBoardItem boardItem={boardItem} />
              </Box>
              <Box sx={{}}>
                <DeleteBoardItem column={column} boardItem={boardItem} />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
BoardItem.propTypes = propTypes;
export default BoardItem;
