import { useEffect } from "react";
import { useRouter } from "next/router";
import { EventItem } from "../../../components/EventItem/EventItem";
import { FormSend } from "../../../components/FormSend/FormSend";
import { useFetchEvents } from "../../../hooks";
import { MenuNavigation } from "../../../components";
import { Box, Typography, Container } from "@mui/material";

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

const EventPage = (): JSX.Element => {
  const { query } = useRouter();
  const { cat, id } = query;

  const cityName = cat ? String(cat).toLocaleLowerCase() : null;
  const eventName = id ? String(id).toLocaleLowerCase() : null;

  const [data, isLoading, error, fetchData]: any = useFetchEvents();

  useEffect(() => {
    if (cityName && eventName) fetchData({ cityName, eventName });
  }, [eventName]);

  const list =
    cityName && eventName
      ? [
          { title: "Home", path: "/", iconName: "home" },
          { title: "Cities", path: "/cities", iconName: "cities" },
          {
            title: capitalizeFirstLetter(cityName),
            path: `/cities/${cat}`,
            iconName: "city",
          },
          {
            title: capitalizeFirstLetter(eventName),
            path: "",
            iconName: "event",
          },
        ]
      : null;

  return (
    <Container maxWidth="xl">
      {list && (
        <Box sx={{ padding: "0.75rem 0" }}>
          <MenuNavigation list={list} />
        </Box>
      )}

      <Box>
        {data && <EventItem event={data.events} isLoading={isLoading} />}
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}
      >
        <FormSend />
      </Box>

      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default EventPage;
