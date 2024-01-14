import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "../Board/Board";
import BoardListDrawer from "../BoardListDrawer/BoardListDrawer.js";
import handleDragEnd from "./handleOnDragEnd.js";
import styles from "./homeStyles.js";
import { GlobalContext } from "../../Store/GlobalProvider";
import { TOP_MARGIN } from "../../Data/globalConstants";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const globalData = useContext(GlobalContext);
  const boardIds = globalData.user.boardIds;
  const boards = globalData.boards;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 577);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const obj = useOutletContext();
  useEffect(() => {
    obj.setPage(obj.pages.HOME);
  });

  const handleOnDragEnd = (result) => {
    handleDragEnd(result, globalData);
  };

  return (
    <Box>
      <Tooltip title="Board List" placement="right">
        <IconButton
          aria-label="open drawer"
          onClick={() => {
            setOpenDrawer(true);
          }}
          edge="start"
          sx={styles.tooltip(openDrawer, TOP_MARGIN)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Box sx={{ ...styles.board(openDrawer, width, TOP_MARGIN), mb: 2 }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <BoardListDrawer
            open={openDrawer}
            setOpen={setOpenDrawer}
            boards={boards}
            setWidth={setWidth}
            isMobile={isMobile}
            topMargin={TOP_MARGIN}
          />
          <Droppable droppableId="main" type="board">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {boardIds.map((boardId, index) => {
                  return (
                    <Board
                      key={boardId}
                      board={boards[boardId]}
                      index={index}
                      isMobile={isMobile}
                    />
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default Home;
