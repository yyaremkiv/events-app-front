import { useEffect } from "react";
import { useFetchCities, useFetchEvents } from "../hooks";
import { TypeFetchCitiesResult } from "../hooks/useFetchCities";
import { TypeFetchEventsResult } from "../hooks/useFetchEvents";
import { MainTitle, MessageError } from "../components";
import { BannerHero } from "../components/BannerHero";
import { HomeCityList } from "../components/HomeCityList/HomeCityList";
import { HomeEventList } from "../components/HomeEventList/HomeEventList";
import { Box, Container } from "@mui/material";

export default function Home(): JSX.Element {
  const [citiesResult, citiesIsLoading, citiesError]: TypeFetchCitiesResult =
    useFetchCities({
      params: { showOnHomePage: true, showInCityHome: true },
    });

  const [
    eventsResult,
    eventsIsLoading,
    eventsError,
    fetchData,
  ]: TypeFetchEventsResult = useFetchEvents();

  useEffect(() => {
    fetchData({ params: { showOnHomePage: true } });
  }, []);

  return (
    <Box sx={{ flex: 1 }}>
      <BannerHero />

      <Container maxWidth="xl">
        <MainTitle title="Join the World of Events" showArrow={true} />

        {citiesResult && !citiesIsLoading && !!citiesResult.cities.length && (
          <HomeCityList cities={citiesResult.cities} />
        )}

        {!citiesIsLoading && citiesResult?.cities.length === 0 && (
          <MessageError
            text={
              citiesError
                ? citiesError
                : "Sorry, There Are Currently No Cities With Events!"
            }
            errorMessage={!!citiesError}
          />
        )}

        {eventsResult && !eventsIsLoading && eventsResult.events.length > 0 && (
          <>
            <MainTitle title="This Es Best Events" showArrow={false} />
            <HomeEventList events={eventsResult.events} />
          </>
        )}

        {!eventsIsLoading && eventsResult?.events.length === 0 && (
          <MessageError
            text={
              eventsError
                ? eventsError
                : "Sorry, There Are Currently No Cities With Events!"
            }
            errorMessage={!!eventsError}
          />
        )}
      </Container>
    </Box>
  );
}
