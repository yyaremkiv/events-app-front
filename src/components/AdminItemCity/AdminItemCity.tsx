import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Divider, Button, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import CityOperations from "../../../src/redux/cities/city.operations";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

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
  const { _id: cityId, city4 } = data;

  const dispatch = useDispatch();
  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const cityName = city.city[0].toUpperCase() + city.city.slice(1);

  useEffect(() => {
    // @ts-ignore
    dispatch(CityOperations.getEvent({ cityName, limit: 10 }));
  }, []);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId: string) => {
    // @ts-ignore
    dispatch(CityOperations.deleteEvent({ cityId, eventId }));
  };

  return (
    <Box>
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <Box>
          <Tooltip title="Add New Event On City" placement="top">
            <IconButton onClick={() => handleAddEvent(cityId)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {!eventsList?.length ? "Dont have events!" : null}

        {eventsList?.map(
          (
            { id: eventId, title, description, date, seats }: any,
            index: number
          ) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                gap: "1rem",
                border: "1px solid green",
              }}
              key={index}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <p>{index}</p>
                <p>{title}</p>
                <p>{date}</p>
                <p>{seats}</p>
              </Box>
              <IconButton onClick={() => handleEditEvent({ cityId, eventId })}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteEvent(eventId)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};
