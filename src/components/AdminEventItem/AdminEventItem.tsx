import { IEventItem } from "../../interfaces";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  HideSource as HideSourceIcon,
  AddHome as AddHomeIcon,
} from "@mui/icons-material";

interface IAdminEventItemProps {
  cityId: string;
  data: IEventItem;
  index: number;
  handleEditEvent: (data: { cityId: string; eventId: string }) => void;
  handleDeleteEvent: (field: string) => void;
}

export const AdminEventItem = ({
  cityId,
  data: { id: eventId, title, showOnHomePage, isHidden, showInCityHome, date },
  index,
  handleEditEvent,
  handleDeleteEvent,
}: IAdminEventItemProps): JSX.Element => {
  const theme = useTheme();

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Tooltip title="Update Event" placement="top">
            <IconButton onClick={() => handleEditEvent({ cityId, eventId })}>
              <EditIcon sx={{ color: theme.palette.text.dark }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Event" placement="top">
            <IconButton onClick={() => handleDeleteEvent(eventId)}>
              <DeleteIcon sx={{ color: theme.palette.text.dark }} />
            </IconButton>
          </Tooltip>
        </Box>
      }
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ListItemText
          primary={index + 1}
          sx={{ color: theme.palette.text.dark }}
        />
        <ListItemText
          primary={title}
          sx={{
            color: theme.palette.text.dark,
            textDecoration:
              new Date() > new Date(date) ? "line-through" : "none",
          }}
        />

        {showOnHomePage && (
          <Tooltip title="This Event Is Shown On The Main Page" placement="top">
            <HomeIcon sx={{ color: theme.palette.text.dark }} />
          </Tooltip>
        )}

        {isHidden && (
          <Tooltip title="Not Displayed On The Site" placement="top">
            <HideSourceIcon color="error" />
          </Tooltip>
        )}

        {showInCityHome && (
          <Tooltip
            title="This Event Is Shown In City On Home Page"
            placement="top"
          >
            <AddHomeIcon sx={{ color: theme.palette.text.dark }} />
          </Tooltip>
        )}

        {new Date() > new Date(date) && (
          <Typography color="error">Stale Event!</Typography>
        )}
      </Box>
    </ListItem>
  );
};
