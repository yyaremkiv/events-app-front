import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import EventService from "@/services/EventService";

export const ListEvent = ({ cityId }) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getEvent(cityId);
      setEventsList(data.events);
    }
    fetch();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
      }}
    >
      {eventsList?.map(({ title, description, date, seats }, index) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <p>{index}</p>
          <p>{title}</p>
          <p>{description}</p>
          <p>{date}</p>
          <p>{seats}</p>
        </Box>
      ))}
    </Box>
  );
};
