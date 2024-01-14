import React, { useState, useEffect, useRef } from "react";
import { ListItem, ListItemButton } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { cancelEdit } from "./handleBoardListItemTitleChange.js";
import BoardListItemTitle from "./BoardListItemTitle.js";
import EditBoardListItemTitle from "./EditBoardListItemTitle.js";

const BoardListDrawerItem = ({ board, index, setWidth }) => {
  const boardListItemId = [board.id, "boardListDrawerItemId"].join("");
  const [isEditing, setIsEditing] = useState(false);
  const listItemRef = useRef(null);

  useEffect(() => {
    const clickOutsideTitleInput = (e) => {
      if (isEditing && e.target.tagName !== "INPUT") {
        cancelEdit(setIsEditing, board);
        setWidth(listItemRef.current.offsetWidth);
      }
    };

    if (isEditing) {
      document.addEventListener("click", clickOutsideTitleInput);
      setWidth(listItemRef.current.offsetWidth);
    } else {
      setWidth(listItemRef.current.offsetWidth);
    }

    return () => {
      document.removeEventListener("click", clickOutsideTitleInput);
    };
  }, [isEditing, setIsEditing, board, setWidth]);

  return (
    <Draggable
      key={boardListItemId}
      draggableId={boardListItemId}
      index={index}
    >
      {(provided) => (
        <ListItem
          disablePadding
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItemButton ref={listItemRef} component="a" href="#simple-list">
            {isEditing ? (
              <EditBoardListItemTitle
                boardId={board.id}
                setIsEditing={setIsEditing}
              />
            ) : (
              <BoardListItemTitle
                board={board}
                setIsEditing={setIsEditing}
                setWidth={setWidth}
              />
            )}
          </ListItemButton>
        </ListItem>
      )}
    </Draggable>
  );
};

export default BoardListDrawerItem;
