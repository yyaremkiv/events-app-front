import Link from "next/link";
import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setModeTheme } from "../../redux/theme/theme.slice";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
} from "@mui/material";
import {
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

export const MobileMenu = (): JSX.Element => {
  const [state, setState] = useState({ left: false });
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  const toggleDrawer =
    (anchor: keyof typeof state, open: boolean) =>
    (e: React.KeyboardEvent | React.MouseEvent) => {
      if (
        e.type === "keydown" &&
        ((e as React.KeyboardEvent).key === "Tab" ||
          (e as React.KeyboardEvent).key === "Shift")
      )
        return;
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: keyof typeof state) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem disablePadding sx={{ padding: "1rem" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 500, color: theme.palette.text.dark }}
        >
          Events
        </Typography>
      </ListItem>
      <Divider />
      <List>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ fontSize: "1.8rem" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          href="/cities"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationCityIcon sx={{ fontSize: "1.8rem" }} />
              </ListItemIcon>
              <ListItemText primary={"Cities"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          href="/about-us"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon sx={{ fontSize: "1.8rem" }} />
              </ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <ListItem disablePadding onClick={() => dispatch(setModeTheme())}>
          <ListItemButton>
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "1.8rem" }} />
              ) : (
                <LightMode sx={{ fontSize: "1.8rem" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={"Change Mode"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0",
        }}
      >
        <IconButton
          onClick={toggleDrawer("left", true)}
          sx={{ color: theme.palette.text.primary }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">Events</Typography>
      </Box>

      <Box>
        <Fragment key={"left"}>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </Fragment>
      </Box>
    </>
  );
};
