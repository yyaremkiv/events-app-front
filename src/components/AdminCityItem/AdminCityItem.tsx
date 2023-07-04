import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderLinearProgress } from "..";
import { AdminEventList } from "../AdminEventList/AdminEventList";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch } from "../../redux/store";
import { ICityItem } from "../../interfaces";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Pagination,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { RootState } from "../../redux/store";

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
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const { _id: cityId } = data;
  const limit = 5;

  const city = useSelector((state: any) => state.events.cities).find(
    (city: ICityItem) => city._id === cityId
  );

  const cityName = city.city.label[0].toUpperCase() + city.city.label.slice(1);

  useEffect(() => {
    if (cityName)
      dispatch(EventOperations.getEvent({ cityName, params: { page, limit } }));
  }, [cityName, page]);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId: string) => {
    dispatch(EventOperations.deleteEvent({ cityId, eventId }));
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: "0.5rem" }} />

      {!eventsList?.length && !isLoading ? (
        <Typography sx={{ textAlign: "center" }}>Don't have events!</Typography>
      ) : null}

      {isLoading && <LoaderLinearProgress />}

      {eventsList.length > 0 && (
        <AdminEventList
          cityId={cityId}
          data={eventsList}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "0.5rem 0",
        }}
      >
        <Tooltip title="Add New Event On City" placement="top">
          <IconButton onClick={() => handleAddEvent(cityId)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {!!city?.totalEvents && eventsList.length < city.totalEvents && (
            <Pagination
              count={Math.ceil(city.totalEvents / limit)}
              page={page}
              onChange={handleChangePage}
              disabled={isLoading}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
