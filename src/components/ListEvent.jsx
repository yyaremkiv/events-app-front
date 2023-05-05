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
  const city = useSelector((state) => state.city.cities).find(
    (city) => city._id === cityId
  );

  useEffect(() => {
    dispatch(CityOperations.getEvent(cityId));
  }, []);

  const eventsList = city.events ? city.events : [];

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
            sx={{ display: "flex", gap: "1rem", border: "1px solid green" }}
            key={index}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p>{eventId}</p>
              <p>{index}</p>
              <p>{title}</p>
              <p>{date}</p>
              <p>{seats}</p>
            </Box>
            <IconButton onClick={() => handleEditEvent({ cityId, eventId })}>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      )}
    </Box>
  );
};
