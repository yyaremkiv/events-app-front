import { SingleEvet } from "@/components/Events/single-event";
import EventService from "@/services/event.service";
import { Box, Menu } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EventPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { cat, id } = router.query;

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getEvent(cat);
      const event = data.events.events.find((event) => event.title === id);
      setData(event);
    }

    if (cat && id) {
      fetch();
    }
  }, [cat, id]);

  console.log("eventPage", data);
  return (
    <Box>
      <SingleEvet data={data} />;
    </Box>
  );
};

export default EventPage;
