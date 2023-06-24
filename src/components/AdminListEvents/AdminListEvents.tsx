import { Box, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { AdminItemEvent } from "../AdminItemEvent/AdminItemEvent";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";

interface IAdminListEventsProps {
  cityId: string;
  data: any;
  handleEditEvent: any;
  handleDeleteEvent: any;
}

export const AdminListEvents = ({
  cityId,
  data,
  handleEditEvent,
  handleDeleteEvent,
}: IAdminListEventsProps): JSX.Element => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((data: any, index: number) => (
        <AdminItemEvent
          key={data.id}
          cityId={cityId}
          data={data}
          index={index}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      ))}
    </List>
  );
};
