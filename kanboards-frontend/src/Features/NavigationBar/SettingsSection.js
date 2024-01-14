import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Menu,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const SettingsSection = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const settings = { Settings: "/settings", Logout: "/logout" };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      {/* This section of the AppBar activates on Large screen sizes */}
      <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, ml: 2 }}>
        {settings.map((setting) => (
          <Button
            key={setting}
            onClick={handleCloseUserMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {setting}
          </Button>
        ))}
      </Box>

      {/* This section of the AppBar activates on SMALL screen sizes */}
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default SettingsSection;
