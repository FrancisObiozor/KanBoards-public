// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import { Grid } from "@mui/material";

import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import TabAccount from "./TabAccount";
import TabSecurity from "./TabSecurity";
import TabDelete from "./TabDelete";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";

import { TOP_MARGIN } from "../../Data/globalConstants";
import { useOutletContext } from "react-router-dom";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Settings = () => {
  const [value, setValue] = useState("account");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const obj = useOutletContext();
  useEffect(() => {
    obj.setPage(obj.pages.SETTINGS);
  });

  return (
    <Card sx={{ mt: `${TOP_MARGIN}px`, height: "90vh" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7}>
          <TabContext value={value}>
            <Grid container justifyContent="center">
              <Grid item>
                <TabList
                  onChange={handleChange}
                  aria-label="account-settings tabs"
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                    justifyContent: "center",
                  }}
                >
                  <Tab
                    value="account"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccountOutline />
                        <TabName>Account</TabName>
                      </Box>
                    }
                  />
                  <Tab
                    value="security"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LockOpenOutline />
                        <TabName>Security</TabName>
                      </Box>
                    }
                  />
                  <Tab
                    value="delete"
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DeleteOutlinedIcon />
                        <TabName>Delete</TabName>
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
            </Grid>

            <TabPanel sx={{ p: 0 }} value="account">
              <TabAccount />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="security">
              <TabSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="delete">
              <TabDelete />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Settings;
