import { BannerHero } from "../components/BannerHero";
import { HomeCityList } from "../components/HomeCityList/HomeCityList";
import { useFetchCities } from "../hooks";
import { TypeFetchCitiesResult } from "../hooks/useFetchCities";
import { Box, Typography, useTheme, Divider, Container } from "@mui/material";
import { HomeEventList } from "../components/HomeEventList/HomeEventList";
import { MainTitle } from "../components/MainTitle";

export default function Home(): JSX.Element {
  const theme = useTheme();

  const [data, isLoading, error]: TypeFetchCitiesResult = useFetchCities({
    params: { showOnHomePage: true, showInCityHome: true },
  });

  return (
    <>
      <BannerHero />

      <MainTitle />

      <Container maxWidth="xl">
        {data && <HomeCityList cities={data.cities} />}

        {data && (
          <Box sx={{ color: theme.palette.text.primary }}>
            <Typography
              variant="h2"
              sx={{
                padding: "1rem 0",
                textAlign: "center",
              }}
            >
              This is the best Events!
            </Typography>
            <HomeEventList />
          </Box>
        )}

        {error && !isLoading && <Typography>{error}</Typography>}
      </Container>
    </>
  );
}
