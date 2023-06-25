import React, { useState } from "react";
import { useAuth } from "../hooks";
import { MenuNavigationLink } from "../components/MenuNavigationLink";
import { AdminTabEvents } from "../components/AdminTabEvents/AdminTabEvents";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Admin = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();

  const handleChange = (_: any, newValue: number) => setValue(newValue);

  return (
    <Box>
      <MenuNavigationLink />

      <Box sx={{ width: "100%", color: theme.palette.text.primary }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="List Of All Cities" {...a11yProps(0)} />
            <Tab label="List Counties" {...a11yProps(1)} />
            <Tab label="List Cities" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AdminTabEvents />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>List of countries in development</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>List of cities in development</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default useAuth(Admin);
