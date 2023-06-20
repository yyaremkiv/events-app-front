import { BannerHero } from "../components/BannerHero";
import { ListCities } from "../components/ListCities";
import { Container } from "@mui/material";
import EventService from "../services/event.service";

export default function Home({ data }: any) {
  return (
    <Container>
      <BannerHero />
      <ListCities data={data} />

      {/* <HomePage data={data} /> */}
    </Container>
  );
}

export async function getServerSideProps() {
  const { data } = await EventService.getCity({ limit: 10 });

  return {
    props: {
      data: data,
    },
  };
}
