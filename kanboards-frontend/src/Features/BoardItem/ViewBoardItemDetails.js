import React, { useState } from "react";
import ViewTask from "../Task/ViewTask.js";
import { Droppable } from "react-beautiful-dnd";
import { Box, Tooltip, Link, Dialog, Grid, Typography } from "@mui/material";
import styles from "./boardItemStyles.js";

export default function ViewBoardItemDetails({ boardItem }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box>
      <Tooltip title="View Description and Checklist" placement="right">
        <Link
          onClick={handleOpen}
          href="#"
          underline="hover"
          sx={{ fontSize: "19px" }}
        >
          {"Details"}
        </Link>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} sx={{ marginTop: "50px" }}>
        <Box sx={{ ...styles.componentLRmargin }}>
          <Typography variant="h4" sx={{ mb: 3, mt: "10px" }}>
            Details
          </Typography>

          <Typography variant="h6" sx={{ mb: "5px", fontWeight: "bold" }}>
            Description:
          </Typography>

          <Typography sx={{ ml: "10px" }} variant="body1">
            {boardItem.description}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
            Tasks:
          </Typography>
          <Box sx={{}}>
            <Droppable droppableId={boardItem.id} type="task">
              {(provided) => (
                <Box ref={provided.innerRef}>
                  <Grid container direction="column" spacing={0}>
                    {boardItem.taskIds.map((taskId, index) => (
                      <Grid item key={taskId}>
                        <ViewTask taskId={taskId} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
