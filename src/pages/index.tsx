import { BannerHero } from "../components/BannerHero";
import { ListCities } from "../components/ListCities";
import { Container } from "@mui/material";
import EventService from "../services/event.service";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await EventService.getCity({ limit: 10 });
      if (data) setData(data);
    }
    fetch();
  }, []);

  return (
    <Container>
      <BannerHero />
      {data?.cities?.length > 0 && <ListCities data={data} />}
    </Container>
  );
}

// export async function getServerSideProps() {
//   const { data } = await EventService.getCity({ limit: 10 });

//   return {
//     props: {
//       data: data,
//     },
//   };
// }
