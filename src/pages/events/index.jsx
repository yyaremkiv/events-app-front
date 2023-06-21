import { useEffect, useState } from "react";
import { AllEvents } from "../../components/Events/events-page";
import EventService from "../../services/event.service";
import {
  Box,
  Pagination,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Refresh as RefreshIcon } from "@mui/icons-material";

const EvantsPage = ({ data, totalCounts }) => {
  const [cities, setCities] = useState(data | []);
  const [totalCities, setTotalCities] = useState(totalCounts | 1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataCity({ page });
  }, [limit]);

  const handleChangePage = (_, newPageValue) => {
    setPage(newPageValue);
    fetchDataCity({ page: newPageValue });
  };

  const handleChangeLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    fetchDataCity({ page: newPageValue, isLoadingMore: true });
  };

  async function fetchDataCity({ page, isLoadingMore = false }) {
    setIsLoading(true);
    try {
      const { data } = await EventService.getCity({ page, limit });
      if (data.cities) {
        const newCitiesList = isLoadingMore
          ? [...cities, ...data.cities]
          : data.cities;
        setTotalCities(data.totalCounts);
        setCities(newCitiesList);
      }
    } catch (err) {
      setError(err?.response?.data.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  }

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
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label">Count</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={limit}
            label="Count"
            onChange={(e) => handleChangeLimit(e.target.value)}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <Typography>All city: {totalCities}</Typography>
        <Typography>Display: {cities.length}</Typography>
      </Box>

      {cities?.length > 0 && <AllEvents data={cities} />}

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
          count={Math.ceil(totalCities / limit)}
          page={page}
          onChange={handleChangePage}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
};

export default EvantsPage;

// export async function getStaticProps() {
//   const { data } = await EventService.getCity({ limit: 10 });

//   if (!data.cities) return null;

//   return {
//     props: {
//       data: data.cities,
//       totalCounts: data.totalCounts,
//     },
//   };
// }
