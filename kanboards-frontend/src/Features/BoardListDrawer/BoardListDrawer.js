import React, { useEffect, useRef, useContext } from "react";
import { Button, Box, Link } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Droppable } from "react-beautiful-dnd";
import BoardListDrawerItem from "./BoardListDrawerItem";
import styles from "./boardListDrawerStyles.js";
import { GlobalContext } from "../../Store/GlobalProvider";
import { addBoard } from "./handleAddDeleteBoard.js";

const BoardListDrawer = ({
  open,
  setOpen,
  boards,
  setWidth,
  isMobile,
  topMargin,
}) => {
  const globalData = useContext(GlobalContext);
  let boardIds = globalData.user.boardIds;

  const boardListDrawerRef = useRef(null);
  useEffect(() => {
    setWidth(boardListDrawerRef.current.offsetWidth);
  }, [setWidth]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  styles.setMaxWidthForMobile(isMobile);

  return (
    <Box>
      <CssBaseline />
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          boxSizing: "border-box",
          alignSelf: "flex-start",
        }}
      >
        <IconButton
          onClick={handleDrawerClose}
          sx={styles.collapseButton(topMargin)}
        >
          <KeyboardDoubleArrowLeftIcon fontSize="large" />
        </IconButton>
        <Link href="#contained-buttons">
          <Button
            variant="contained"
            endIcon={<AddBoxOutlinedIcon />}
            onClick={() => addBoard(globalData)}
            sx={styles.newBoardButton}
          >
            New Board
          </Button>
        </Link>

        <Droppable droppableId="boardListDrawer" type="boardList">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              <List ref={boardListDrawerRef} sx={styles.boardList}>
                {boardIds.map((boardId, index) => (
                  <BoardListDrawerItem
                    key={index}
                    board={boards[boardId]}
                    index={index}
                    setWidth={setWidth}
                  />
                ))}
                {provided.placeholder}
              </List>
            </Box>
          )}
        </Droppable>
      </Drawer>
    </Box>
  );
};

export default BoardListDrawer;
