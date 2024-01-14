import { Checkbox, Typography, Grid, Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../Store/GlobalProvider";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const ViewTask = ({ taskId, index }) => {
  const globalData = useContext(GlobalContext);

  let currentTask = globalData.tasks[taskId];

  const [check, setCheck] = useState(currentTask.isCompleted);

  const handleCheckChange = (event) => {
    const isChecked = event.target.checked;
    setCheck(isChecked);
    currentTask.isCompleted = isChecked;
    globalData.updateTasks(globalData.tasks);
  };

  return (
    <Draggable key={taskId} draggableId={taskId} index={index}>
      {(provided) => (
        <Grid
          taskId
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Checkbox
            checked={check}
            onChange={handleCheckChange}
            color="primary"
          />
          <Typography variant="body1" style={{ flex: 1 }}>
            {currentTask.title}
          </Typography>
          <Box {...provided.dragHandleProps}>
            <DragHandleIcon />
          </Box>
        </Grid>
      )}
    </Draggable>
  );
};

export default ViewTask;
