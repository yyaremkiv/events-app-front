import { EventService } from "../../../services";
import { Box, Menu } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MenuNavigation } from "../../../components/MenuNavigation";

import { ItemEvent } from "../../../components/ItemEvent/ItemEvent";

const EventPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { cat, id } = router.query;

  const cityName = cat ? cat[0].toUpperCase() + cat.slice(1) : null;
  const eventName = id ? id[0].toUpperCase() + id.slice(1) : null;

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getEvent({ cityName: cat });
      const event = data.events.find((event: any) => event.title === id);

      setData(event);
    }

    if (cat && id) fetch();
  }, [cat, id]);

  return (
    <Box>
      <MenuNavigation
        // @ts-ignore
        list={[
          { title: "Home", path: "/", iconName: "home" },
          { title: cityName, path: `/events/${cat}`, iconName: "city" },
          { title: eventName, path: "", iconName: "event" },
        ]}
      />
      <ItemEvent data={data} />
    </Box>
  );
};

export default EventPage;
