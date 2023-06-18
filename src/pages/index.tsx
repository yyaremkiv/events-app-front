import { Box, Container, Grid, ImageListItem } from "@mui/material";
import { BannerHero } from "../components/BannerHero";
import { HomePage } from "../components/Home/Home.page";
import EventService from "../services/event.service";
import { GridWrapper } from "../components/GridWrapper";
import Link from "next/link";
import { ListHomePage } from "../components/ListHomePage";

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
