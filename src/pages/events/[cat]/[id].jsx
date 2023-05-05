import { SingleEvet } from "@/components/Events/single-event";
import EventService from "@/services/event.service";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EventPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { cat, id } = router.query;

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getEvent(cat);
      const event = data.events.find((event) => event.id === id);
      setData(event);
    }

    if (cat && id) {
      fetch();
    }
  }, [cat, id]);

  return <SingleEvet data={data} />;
};

export default EventPage;
