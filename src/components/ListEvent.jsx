import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CityOperations from "@/redux/cities/city.operations";
import { useDispatch, useSelector } from "react-redux";

export const ListEvent = ({ cityId, handleAddEvent }) => {
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
      {!eventsList?.length ? "Dont have events!" : null}

      {eventsList?.map(({ title, description, date, seats }, index) => (
        <Box sx={{ display: "flex", gap: "1rem" }} key={index}>
          <p>{index}</p>
          <p>{title}</p>
          <p>{description}</p>
          <p>{date}</p>
          <p>{seats}</p>
        </Box>
      ))}
      <Box>
        <Button variant="outlined" onClick={() => handleAddEvent(cityId)}>
          add New event
        </Button>
      </Box>
    </Box>
  );
};
