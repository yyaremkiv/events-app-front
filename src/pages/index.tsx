import { BannerHero } from "../components/BannerHero";
import { HomeCityList } from "../components/HomeCityList/HomeCityList";
import { useFetchCities } from "../hooks";
import { MenuNavigationLink } from "../components/MenuNavigationLink";
import { TypeFetchCitiesResult } from "../hooks/useFetchCities";
import { Typography } from "@mui/material";

export default function Home(): JSX.Element {
  const [data, isLoading, error]: TypeFetchCitiesResult = useFetchCities({
    params: { showOnHomePage: true },
  });

  return (
    <>
      <MenuNavigationLink />
      <BannerHero />

      {data.cities.length > 0 && <HomeCityList data={data.cities} />}

      {error && !isLoading && <Typography>{error}</Typography>}
    </>
  );
}
