import { useEffect } from "react";
import { useFetchCities, useFetchEvents } from "../hooks";
import { TypeFetchCitiesResult } from "../hooks/useFetchCities";
import { TypeFetchEventsResult } from "../hooks/useFetchEvents";
import { MainTitle, MessageError, BannerHero } from "../components";
import { HomeCityList } from "../components/HomeCityList/HomeCityList";
import { HomeEventList } from "../components/HomeEventList/HomeEventList";
import { Box, Container } from "@mui/material";

const textValues = {
  citiesSubtitle:
    "Welcome to our website, where you can find information about various exciting events happening around the world. Here, you can explore a diverse range of events, from concerts and exhibitions to sports competitions and cultural festivals. On our website, you will discover an up-to-date event calendar featuring detailed descriptions? dates, venues, and other valuable information. Browse through our event listings, choose what interests you, and join in on the thrilling experiences that will leave a lasting impression.",
  cityText: "Sorry, There Are Currently No Cities With Events!",
  eventText: "Sorry, There Are Currently No Cities With Events!",
};

const Home = (): JSX.Element => {
  const [citiesResult, citiesIsLoading, citiesError]: TypeFetchCitiesResult =
    useFetchCities({ params: { showOnHomePage: true, showInCityHome: true } });

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
        {citiesResult.cities.length > 0 && (
          <>
            <MainTitle
              title="Join the World of Events"
              subtitle={textValues.citiesSubtitle}
              showArrow={true}
            />
            <HomeCityList cities={citiesResult.cities} />
          </>
        )}

        {!citiesIsLoading && citiesResult.cities.length === 0 && (
          <MessageError
            text={citiesError ? citiesError : textValues.cityText}
            errorMessage={!!citiesError}
          />
        )}

        {eventsResult.events.length > 0 && (
          <>
            <MainTitle title="These Are The Best Events" showArrow={false} />
            <HomeEventList events={eventsResult.events} />
          </>
        )}

        {!eventsIsLoading && eventsResult.events.length === 0 && (
          <MessageError
            text={eventsError ? eventsError : textValues.eventText}
            errorMessage={!!eventsError}
          />
        )}
      </Container>
    </Box>
  );
};

export default Home;
