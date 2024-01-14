import { Typography, Box } from "@mui/material";

const Copyright = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: 0,
        Width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Copyright © Kan Boards 2023. All rights reserved.
      </Typography>
    </Box>
  );
};
export default Copyright;
