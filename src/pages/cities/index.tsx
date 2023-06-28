import { useEffect, useState } from "react";
import { CityList } from "@/src/components/CityList/CityList";
import { useFetchCities } from "../../hooks";
import { FetchCitiesResult } from "../../hooks/useFetchCities";
import {
  Box,
  Pagination,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { CustomAutocompleteOfCountries } from "@/src/components/CustomAutocompleteOfCountries";
import { DataConfigInformation } from "../../data";
import { CustomAutocompleteOfCities } from "@/src/components/CustomAutocompleteOfCities";
import { MenuNavigation } from "@/src/components/MenuNavigation";
import { ICountry, ICity } from "../../interfaces";

const EvantsPage = (): JSX.Element => {
  const [countriesFilter, setCountriesFilter] = useState<ICountry[] | []>([]);
  const [citiesFilter, setCitiesFilter] = useState<ICity[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [data, isLoading, error, fetchData]: FetchCitiesResult = useFetchCities(
    { page, limit }
  );
  const theme = useTheme();

  let allCountries = DataConfigInformation.listCountries;
  let allCities = DataConfigInformation.listCities;

  const handleChangeLimit = (nevLimit: number) => {
    setPage(1);
    setLimit(nevLimit);
    fetchData({ page: 1, limit: nevLimit });
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
    fetchData({ page: newPageValue, limit });
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    fetchData({ page: newPageValue, limit });
  };

  useEffect(() => {
    setCitiesFilter([]);
  }, [countriesFilter]);

  console.log("allCities", allCities);

  return (
    <Box>
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

      <Box>
        <MenuNavigation
          list={[
            { title: "Home", path: "/", iconName: "home" },
            { title: "Cities", path: "", iconName: "city" },
          ]}
        />
      </Box>

      {data.cities?.length > 0 && (
        <CityList data={data.cities} totalCities={Number(data.totalCities)} />
      )}

      {data.cities?.length < data.totalCities && (
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
    </Box>
  );
};

export default EvantsPage;
