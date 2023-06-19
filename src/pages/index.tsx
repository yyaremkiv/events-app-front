import { BannerHero } from "../components/BannerHero";
import { ListHomePage } from "../components/ListHomePage";
import { Container } from "@mui/material";
import EventService from "../services/event.service";

export default function Home({ data }: any) {
  return (
    <Container>
      <BannerHero />
      <ListHomePage data={data} />

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
