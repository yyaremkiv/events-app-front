import { useState } from "react";
import { ListCities } from "@/src/components/ListCities/ListCities";
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
import { MenuNavigationLink } from "@/src/components/MenuNavigationLink";

const EvantsPage = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
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
      <MenuNavigationLink />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 80, color: theme.palette.text.primary }}
          size="small"
        >
          <InputLabel>Count</InputLabel>
          <Select
            value={limit}
            label="Count"
            onChange={(e) => handleChangeLimit(Number(e.target.value))}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ color: theme.palette.text.primary }}>
          All city: {data.totalCities}
        </Typography>
        <Typography sx={{ color: theme.palette.text.primary }}>
          Display: {data?.cities.length}
        </Typography>
      </Box>

      {data.cities?.length > 0 && <ListCities data={data.cities} />}

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem 0",
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
