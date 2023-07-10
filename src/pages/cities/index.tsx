import { useEffect, useState } from "react";
import { useFetchCities } from "../../hooks";
import { TypeFetchCitiesResult } from "../../hooks/useFetchCities";
import { CityList } from "../../components/CityList/CityList";
import { Box, Typography, useTheme, Container } from "@mui/material";
import {
  DataDisplay,
  ButtonLoadMore,
  MenuNavigation,
  PaginationPage,
  CustomAutocompleteOfCities,
  CustomAutocompleteOfCountries,
} from "../../components";
import { IQueryParams, ICountry, ICity } from "../../interfaces";

const arrToStr = (items: ICountry[] | ICity[]) => {
  return items.map(({ label }) => label).join(",");
};

const CitiesPage = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [allCountries, setAllCountries] = useState<any>([]);
  const [allCities, setAllCities] = useState<any>([]);
  const [countriesFilter, setCountriesFilter] = useState<any>([]);
  const [citiesFilter, setCitiesFilter] = useState<any>([]);
  const theme = useTheme();

  const params: IQueryParams = { page, limit };
  if (countriesFilter.length > 0) params.countries = arrToStr(countriesFilter);
  if (citiesFilter.length > 0) params.cities = arrToStr(citiesFilter);

  const [data, isLoading, error, fetchData]: TypeFetchCitiesResult =
    useFetchCities({ params });

  useEffect(() => {
    if (countriesFilter.length === 0) {
      setAllCities(data?.searchParams.cities || []);
      setCitiesFilter([]);
      return;
    }

    const allFilteredCountries = countriesFilter.map(
      (country: ICountry) => country.label
    );

    const availableCities = data?.searchParams.cities.filter((city: ICity) => {
      if (allFilteredCountries.includes(city.country)) return true;
      return false;
    });

    setCitiesFilter([]);
    setAllCities(availableCities);
  }, [countriesFilter]);

  useEffect(() => {
    fetchData({ params });
  }, [countriesFilter, citiesFilter]);

  if (allCountries.length === 0 && data?.searchParams) {
    setAllCountries(data.searchParams.countries);
    setAllCities(data.searchParams.cities);
  }

  const handleChangeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
    fetchData({ params: { ...params, page: 1, limit: newLimit } });
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
    fetchData({ params: { ...params, page: newPageValue } });
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    fetchData({ params: { ...params, page: newPageValue }, loadMore: true });
  };

  return (
    <Box sx={{ paddingBottom: "2rem" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "2rem",
            padding: "10px 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              width: "100%",
            }}
          >
            <CustomAutocompleteOfCountries
              label="Set Country"
              value={countriesFilter}
              options={allCountries}
              onChangeFunc={setCountriesFilter}
              isLoading={isLoading}
            />

            <CustomAutocompleteOfCities
              label="Set Cities"
              value={citiesFilter}
              options={allCities}
              onChangeFunc={setCitiesFilter}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Container>

      <Box>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuNavigation
            list={[
              { title: "Home", path: "/", iconName: "home" },
              { title: "Cities", path: "", iconName: "city" },
            ]}
          />

          {data && data?.totalCities && (
            <DataDisplay
              values={[
                { name: "All city", value: data.totalCities },
                { name: "Display", value: data?.cities.length },
              ]}
              valuesCount={[3, 5, 15]}
              limit={limit}
              limitChangeFunc={handleChangeLimit}
            />
          )}
        </Container>
      </Box>

      {data && data.cities?.length > 0 && (
        <Container maxWidth="xl">
          <CityList cities={data.cities} />
        </Container>
      )}

      {data && data.cities?.length < data.totalCities && (
        <>
          <ButtonLoadMore
            text="Load more cities!"
            handleLoadMore={handleLoadMore}
            isLoading={isLoading}
          />

          <PaginationPage
            page={page}
            limit={limit}
            totalCount={data.totalCities}
            handleChangePage={handleChangePage}
            isLoading={isLoading}
          />
        </>
      )}

      {!error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default CitiesPage;
