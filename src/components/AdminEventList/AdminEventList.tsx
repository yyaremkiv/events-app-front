import { Box, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { AdminEventItem } from "../AdminEventItem/AdminEventItem";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";

interface IAdminEventListProps {
  cityId: string;
  data: any;
  handleEditEvent: any;
  handleDeleteEvent: any;
}

export const AdminEventList = ({
  cityId,
  data,
  handleEditEvent,
  handleDeleteEvent,
}: IAdminEventListProps): JSX.Element => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((data: any, index: number) => (
        <AdminEventItem
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
