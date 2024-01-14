import React, { useState, useContext } from "react";
import EditTask from "../Task/EditTask.js";
import { Droppable } from "react-beautiful-dnd";
import {
  Tooltip,
  IconButton,
  TextField,
  Button,
  Dialog,
  Typography,
  DialogContentText,
  DialogActions,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import cloneDeep from "lodash/cloneDeep";
import {
  handleClose,
  handleChange,
  handleSave,
  handleDate,
} from "./handleEditBoardItem.js";
import { addTask } from "./handleAddDeleteTask.js";
import styles from "./editBoardItemStyles.js";
import { GlobalContext } from "../../Store/GlobalProvider";

export default function EditBoardItem({ boardItem }) {
  const globalData = useContext(GlobalContext);

  const [boardItemCopy, setBoardItemCopy] = useState(cloneDeep(boardItem));
  const [tasksCopy, setTasksCopy] = useState(cloneDeep(globalData.tasks));
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    title: boardItem.title,
    description: boardItem.description,
    dueDate: new Date(boardItem.dueDate),
  });

  const close = () => {
    handleClose(
      globalData,
      boardItem,
      boardItemCopy,
      tasksCopy,
      formValues,
      setFormValues,
      setOpen
    );
  };

  return (
    <Box>
      <Tooltip title="Edit Board Item" placement="bottom">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => close()} sx={{ marginTop: "50px" }}>
        <Typography variant="h4" sx={styles.title}>
          Edit
        </Typography>

        <Box sx={{ ml: "20px", mr: "20px" }}>
          <DialogContentText>Title:</DialogContentText>
          <TextField
            margin="dense"
            name="title"
            type="text"
            fullWidth
            value={formValues.title}
            onChange={(event) => handleChange(event, setFormValues)}
          />

          <DialogContentText>Description:</DialogContentText>
          <TextField
            margin="dense"
            name="description"
            multiline
            rows={4}
            value={formValues.description}
            onChange={(event) => handleChange(event, setFormValues)}
            fullWidth
          />

          <DialogContentText>Due Date:</DialogContentText>
          <TextField
            type="date"
            name="dueDate"
            value={format(formValues.dueDate, "yyyy-MM-dd")}
            onChange={(event) => handleDate(event, setFormValues, boardItem)}
            sx={{ width: 220 }}
          />

          <Box>
            <DialogContentText sx={{ marginTop: "5px" }}>
              Tasks:
            </DialogContentText>
            <Button
              onClick={() => addTask(boardItem, globalData)}
              color="primary"
              variant="contained"
              sx={styles.addTaskButton}
            >
              Add Task
            </Button>
          </Box>
          <Droppable droppableId={boardItem.id} type="task">
            {(provided) => (
              <Box ref={provided.innerRef}>
                <Grid container direction="column" spacing={0}>
                  {boardItem.taskIds.map((taskId, index) => (
                    <Grid item key={taskId}>
                      <EditTask
                        taskId={taskId}
                        index={index}
                        boardItem={boardItem}
                      />
                    </Grid>
                  ))}
                </Grid>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <DialogActions>
            <Button onClick={() => close()} sx={{ color: "gray" }}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleSave(
                  setOpen,
                  formValues,
                  setBoardItemCopy,
                  setTasksCopy,
                  boardItem,
                  globalData
                )
              }
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
