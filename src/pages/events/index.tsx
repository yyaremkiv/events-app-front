import { useState } from "react";
import { AllEvents } from "../../components/Events/events-page";
import { useFetchCities } from "../../hooks";
import { FetchCitiesResult } from "../../hooks/useFetchEvents";
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

const EvantsPage = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [data, isLoading, error, fetchData]: FetchCitiesResult = useFetchCities(
    { page, limit }
  );
  const theme = useTheme();

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

  return (
    <Box>
      <Box
        sx={{
          border: "1px solid gray",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 80, color: theme.palette.text.primary }}
          size="small"
        >
          <InputLabel id="demo-select-small-label">Count</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={limit}
            label="Count"
            onChange={(e) => handleChangeLimit(Number(e.target.value))}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ color: theme.palette.text.primary }}>
          All city: {data.totalCities}
        </Typography>
        <Typography sx={{ color: theme.palette.text.primary }}>
          Display: {data?.cities.length}
        </Typography>
      </Box>

      {data.cities?.length > 0 && <AllEvents data={data.cities} />}

      <Box sx={{ display: "flex", justifyContent: "center", p: "0.75rem" }}>
        <LoadingButton
          variant="text"
          loadingPosition="start"
          startIcon={<RefreshIcon />}
          loading={isLoading}
          onClick={handleLoadMore}
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
    </Box>
  );
};

export default EvantsPage;
