import {
  Checkbox,
  TextField,
  Grid,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import React, { useState, useContext } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "../BoardItem/handleAddDeleteTask.js";
import { GlobalContext } from "../../Store/GlobalProvider";

const EditTask = ({ taskId, boardItem, index }) => {
  const globalData = useContext(GlobalContext);
  const task = globalData.tasks[taskId];
  const [check, setCheck] = useState(task.isCompleted);
  const [title, setTitle] = useState(task.title);

  const handleCheckChange = (event) => {
    const isChecked = event.target.checked;
    setCheck(isChecked);

    task.isCompleted = isChecked;
    globalData.updateTasks(globalData.tasks);
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;

    task.title = newTitle;
    globalData.updateTasks(globalData.tasks);
    setTitle(newTitle);
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Grid
          item
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            mt: "5px",
            mb: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => deleteTask(taskId, index, boardItem, globalData)}
            sx={{ mr: 2 }}
          >
            <DeleteIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem />
          <Checkbox
            checked={check}
            onChange={handleCheckChange}
            color="primary"
          />
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              style: {
                height: "40px",
              },
            }}
            sx={{ flex: 1 }}
          />

          <Box
            xs={1}
            style={{ display: "flex", textAlign: "right" }}
            {...provided.dragHandleProps}
          >
            <DragHandleIcon />
          </Box>
        </Grid>
      )}
    </Draggable>
  );
};

export default EditTask;
