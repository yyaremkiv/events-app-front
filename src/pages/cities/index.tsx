import { useEffect, useState } from "react";
import { CityList } from "@/src/components/CityList/CityList";
import { useFetchCities } from "../../hooks";
import { TypeFetchCitiesResult } from "../../hooks/useFetchCities";
import {
  Box,
  Pagination,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  useTheme,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MenuNavigation } from "@/src/components/MenuNavigation";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { CustomAutocompleteOfCities } from "@/src/components/CustomAutocompleteOfCities";
import { CustomAutocompleteOfCountries } from "@/src/components/CustomAutocompleteOfCountries";
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
    <Box>
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
          {data && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "2rem",
                padding: "10px 0",
              }}
            >
              <FormControl
                size="small"
                sx={{ m: 1, minWidth: 80, color: theme.palette.text.primary }}
              >
                <InputLabel>Count</InputLabel>
                <Select
                  label="Count"
                  value={limit}
                  onChange={(e) => handleChangeLimit(Number(e.target.value))}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
              <Typography
                sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap" }}
              >
                All city: {data.totalCities}
              </Typography>
              <Typography
                sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap" }}
              >
                Display: {data?.cities.length}
              </Typography>
            </Box>
          )}

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
        <Container maxWidth="xl">
          <MenuNavigation
            list={[
              { title: "Home", path: "/", iconName: "home" },
              { title: "Cities", path: "", iconName: "city" },
            ]}
          />
        </Container>
      </Box>
      {data && data.cities?.length > 0 && (
        <Container maxWidth="xl">
          <CityList cities={data.cities} />
        </Container>
      )}
      {data && data.cities?.length < data.totalCities && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "0.75rem",
              color: theme.palette.text.primary,
            }}
          >
            <LoadingButton
              variant="text"
              loadingPosition="start"
              onClick={handleLoadMore}
              loading={isLoading}
              startIcon={<RefreshIcon />}
              sx={{ p: "0.75rem 2rem", fontSize: "0.8rem", color: "inherit" }}
            >
              <span>Load more cities!</span>
            </LoadingButton>
          </Box>
          <Box
            sx={{
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <Pagination
              count={Math.ceil(data.totalCities / limit)}
              page={page}
              onChange={handleChangePage}
              disabled={isLoading}
            />
          </Box>
        </>
      )}
      {!error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default CitiesPage;
