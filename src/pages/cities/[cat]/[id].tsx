import { useEffect } from "react";
import { useRouter } from "next/router";
import { EventItem } from "../../../components/EventItem/EventItem";
import { MenuNavigation } from "../../../components/MenuNavigation";
import { useFetchSingleEvent } from "../../../hooks";
import { TypeFetchSingleEventResult } from "../../../hooks/useFetchSingleEvent";
import { Box, Typography } from "@mui/material";
import { FormSend } from "@/src/components/FormSend/FormSend";

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

const EventPage = (): JSX.Element => {
  const { query } = useRouter();
  const { cat, id } = query;
  const cityName = cat ? String(cat).toLocaleLowerCase() : null;
  const eventName = id ? String(id).toLocaleLowerCase() : null;

  const [data, isLoading, error, fetchData]: TypeFetchSingleEventResult =
    useFetchSingleEvent();

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
    <Box>
      {list && (
        <Box sx={{ padding: "0.75rem 0" }}>
          <MenuNavigation list={list} />
        </Box>
      )}

      <Box>{data && <EventItem event={data} isLoading={isLoading} />}</Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}
      >
        <FormSend />
      </Box>

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default EventPage;
