import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminListEvents } from "../AdminListEvents/AdminListEvents";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EventOperations } from "../../redux/event/event.operations";
import { ICityItem } from "../../interfaces";
import { AppDispatch } from "../../redux/store";

interface IAdminItemCityProps {
  data: ICityItem;
  handleAddEvent: (value: string) => void;
  handleEditEvent: any;
}

export const AdminItemCity = ({
  data,
  handleAddEvent,
  handleEditEvent,
}: IAdminItemCityProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { _id: cityId } = data;

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const cityName = city.city[0].toUpperCase() + city.city.slice(1);

  useEffect(() => {
    dispatch(EventOperations.getEvent(cityName));
  }, []);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId: string) => {
    dispatch(EventOperations.deleteEvent({ cityId, eventId }));
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: "0.5rem" }} />

      {!eventsList?.length ? "Dont have events!" : null}

      <LinearProgress sx={{ backgroundColor: "red" }} />

      {/* <AdminListEvents
        cityId={cityId}
        data={eventsList}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      /> */}

      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "0.5rem 0" }}
      >
        <Tooltip title="Add New Event On City" placement="top">
          <IconButton onClick={() => handleAddEvent(cityId)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
