import { SingleEvet } from "../../../components/Events/single-event";
import EventService from "../../../services/event.service";
import { Box, Menu } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MenuNavigation } from "../../../components/MenuNavigation.jsx";

const EventPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { cat, id } = router.query;

  const cityName = cat ? cat[0].toUpperCase() + cat.slice(1) : null;
  const eventName = id ? id[0].toUpperCase() + id.slice(1) : null;

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getEvent({ cityName: cat });
      const event = data.events.find((event) => event.title === id);

      setData(event);
    }

    if (cat && id) fetch();
  }, [cat, id]);

  return (
    <Box>
      <MenuNavigation
        list={[
          { title: "Home", path: "/", iconName: "home" },
          { title: cityName, path: `/events/${cat}`, iconName: "city" },
          { title: eventName, path: "", iconName: "event" },
        ]}
      />
      <SingleEvet data={data} />;
    </Box>
  );
};

export default EventPage;
