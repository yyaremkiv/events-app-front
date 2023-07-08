import { AdminEventItem } from "../AdminEventItem/AdminEventItem";
import { List } from "@mui/material";

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
    <List sx={{ width: "100%", backgroundColor: "background.paper" }}>
      {data?.map((data: any, index: number) => (
        <AdminEventItem
          key={index}
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
