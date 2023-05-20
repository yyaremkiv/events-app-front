import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CityOperations from "@/redux/cities/city.operations";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListEvent = ({
  cityId,
  eventId,
  handleAddEvent,
  handleEditEvent,
}) => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.events.cities).find(
    (city) => city._id === cityId
  );

  const cityName = city.city[0].toUpperCase() + city.city.slice(1);

  useEffect(() => {
    dispatch(CityOperations.getEvent({ cityName, limit: 10 }));
  }, []);

  const eventsList = city.events ? city.events : [];

  const handleDeleteEvent = (eventId) => {
    dispatch(CityOperations.deleteEvent({ cityId, eventId }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
      }}
    >
      <Box>
        <Button variant="outlined" onClick={() => handleAddEvent(cityId)}>
          add New event
        </Button>
      </Box>

      {!eventsList?.length ? "Dont have events!" : null}

      {eventsList?.map(
        ({ id: eventId, title, description, date, seats }, index) => (
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
  );
};
