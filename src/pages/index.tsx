import { BannerHero } from "../components/BannerHero";
import { ListHomeEvents } from "../components/ListHomeEvents/ListHomeEvents";
import { Container, Typography } from "@mui/material";
import { useFetchHomeEvent } from "../hooks";
import { IUseFetchHomeEvent } from "../hooks/useFetchHomeEvent";

export default function Home(): JSX.Element {
  const { data, isLoading, error }: IUseFetchHomeEvent = useFetchHomeEvent();

  return (
    <Container>
      <BannerHero />
      {data.length > 0 && <ListHomeEvents data={data} />}

      {error && !isLoading && <Typography>{error}</Typography>}
    </Container>
  );
}
