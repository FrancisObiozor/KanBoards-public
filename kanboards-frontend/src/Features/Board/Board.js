import props from "prop-types";
import Column from "../Column/Column.js";
import { Box } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./boardStyles.js";
import React, { useContext } from "react";
import FirstColumn from "./FirstColumn";
import { GlobalContext } from "../../Store/GlobalProvider";

const propTypes = {
  board: props.object.isRequired,
  index: props.number.isRequired,
  isMobile: props.bool.isRequired,
};

const Board = ({ board, index, isMobile }) => {
  const globalData = useContext(GlobalContext);
  const columnIds = globalData.boards[board.id].columnIds;
  const columns = globalData.columns;

  styles.styleForMobileScreens(isMobile);

  return (
    <Draggable key={board.id} draggableId={board.id} index={index}>
      {(provided) => (
        <Box
          sx={styles.board}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <FirstColumn board={board} provided={provided} styles={styles} />
          <Droppable
            droppableId={board.id}
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  ...styles.columnsContainer,
                  width: "100%",
                }}
              >
                {columnIds.map((columnId, index) => {
                  return (
                    <Column
                      board={board}
                      column={columns[columnId]}
                      index={index}
                      key={index}
                    />
                  );
                })}

                {/* If there are no columns in the board then there needs to be
                a placeholder space to allow columns to be dragged into the
                empty board */}
                {columnIds.length === 0 ? (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  ></Box>
                ) : (
                  <Box></Box>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

Board.propTypes = propTypes;

export default Board;
