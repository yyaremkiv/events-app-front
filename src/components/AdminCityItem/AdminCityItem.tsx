import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderLinearProgress } from "..";
import { AdminEventList } from "../AdminEventList/AdminEventList";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch } from "../../redux/store";
import { ICityItem } from "../../interfaces";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface IAdminCityItemProps {
  data: ICityItem;
  handleAddEvent: (value: string) => void;
  handleEditEvent: any;
  isLoading?: boolean;
}

export const AdminCityItem = ({
  data,
  handleAddEvent,
  handleEditEvent,
  isLoading = false,
}: IAdminCityItemProps): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { _id: cityId } = data;

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const cityName = city.city.label[0].toUpperCase() + city.city.label.slice(1);

  useEffect(() => {
    if (cityName) dispatch(EventOperations.getEvent(cityName));
  }, [cityName]);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId: string) => {
    dispatch(EventOperations.deleteEvent({ cityId, eventId }));
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: "0.5rem" }} />

      {!eventsList?.length && !isLoading ? "Dont have events!" : null}

      {isLoading ? (
        <LoaderLinearProgress />
      ) : (
        <AdminEventList
          cityId={cityId}
          data={eventsList}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}

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
