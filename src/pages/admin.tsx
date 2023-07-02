import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks";
import { AdminEventTab } from "../components/AdminEventTab/AdminEventTab";
import {
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { MenuNavigation } from "../components/MenuNavigation";
import { AppDispatch } from "../redux/store";
import { AuthOperations } from "../redux/auth/auth.operations";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const list = [
  { title: "Home", path: "/", iconName: "home" },
  { title: "Admin", path: "", iconName: "admin" },
];

const Admin = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (_: any, newValue: number) => setValue(newValue);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem 0",
        }}
      >
        <MenuNavigation list={list} />
        <Tooltip title="Logout" placement="top">
          <IconButton onClick={() => dispatch(AuthOperations.logout())}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>

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
          <AdminEventTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>List of countries in development</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>List of cities in development</Typography>
        </TabPanel>
      </Box>
    </Container>
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
