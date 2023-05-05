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
      console.log("cat = ", cat, "id = ", id);
      const { data } = await EventService.getEvent(cat);
      console.log("data", cat, data);
      const event = data.events.filter((event) => event.id === id);
      setData(event);
    }

    if (cat && id) {
      fetch();
    }
  }, [cat, id]);

  return <SingleEvet data={data} />;
};

export default EventPage;
