import { BannerHero } from "../components/BannerHero";
import { HomeCityList } from "../components/HomeCityList/HomeCityList";
import { Typography } from "@mui/material";
import { useFetchHomeEvent } from "../hooks";
import { IUseFetchHomeEvent } from "../hooks/useFetchHomeEvent";
import { MenuNavigationLink } from "../components/MenuNavigationLink";

export default function Home(): JSX.Element {
  const { data, isLoading, error }: IUseFetchHomeEvent = useFetchHomeEvent();

  return (
    <>
      <MenuNavigationLink />
      <BannerHero />
      {data.length > 0 && <HomeCityList data={data} />}

      {error && !isLoading && <Typography>{error}</Typography>}
    </>
  );
}
