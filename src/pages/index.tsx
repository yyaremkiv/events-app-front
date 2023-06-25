import { BannerHero } from "../components/BannerHero";
import { ListHomeCities } from "../components/ListHomeCities/ListHomeCities";
import { Container, Typography } from "@mui/material";
import { useFetchHomeEvent } from "../hooks";
import { IUseFetchHomeEvent } from "../hooks/useFetchHomeEvent";
import { MenuNavigationLink } from "../components/MenuNavigationLink";

export default function Home(): JSX.Element {
  const { data, isLoading, error }: IUseFetchHomeEvent = useFetchHomeEvent();

  return (
    <Container>
      <MenuNavigationLink />
      <BannerHero />
      {data.length > 0 && <ListHomeCities data={data} />}

      {error && !isLoading && <Typography>{error}</Typography>}
    </Container>
  );
}
