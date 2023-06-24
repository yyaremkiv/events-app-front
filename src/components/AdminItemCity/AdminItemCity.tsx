import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminListEvents } from "../AdminListEvents/AdminListEvents";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EventOperations } from "../../redux/event/event.operations";

interface IAdminItemCityProps {
  data: any;
  handleAddEvent: (value: string) => void;
  handleEditEvent: any;
}

export const AdminItemCity = ({
  data,
  handleAddEvent,
  handleEditEvent,
}: IAdminItemCityProps): JSX.Element => {
  const dispatch = useDispatch();
  const { _id: cityId, city4 } = data;

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const cityName = city.city[0].toUpperCase() + city.city.slice(1);

  useEffect(() => {
    // @ts-ignore
    dispatch(EventOperations.getEvent({ cityName, limit: 10 }));
  }, []);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId: string) => {
    // @ts-ignore
    dispatch(EventOperations.deleteEvent({ cityId, eventId }));
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: "0.5rem" }} />

      {!eventsList?.length ? "Dont have events!" : null}

      <AdminListEvents
        cityId={cityId}
        data={eventsList}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />

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
