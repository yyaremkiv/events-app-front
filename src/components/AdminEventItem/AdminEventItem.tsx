import {
  Box,
  IconButton,
  Tooltip,
  useTheme,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface IAdminEventItemProps {
  cityId: string;
  data: { id: string; title: string };
  index: number;
  handleEditEvent: (data: { cityId: string; eventId: string }) => void;
  handleDeleteEvent: (field: string) => void;
}

export const AdminEventItem = ({
  cityId,
  data: { id: eventId, title },
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
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ListItemText
          primary={index + 1}
          sx={{ color: theme.palette.text.dark }}
        />
        <ListItemText primary={title} sx={{ color: theme.palette.text.dark }} />
      </Box>
    </ListItem>
  );
};
