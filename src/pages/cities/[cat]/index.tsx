import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { MenuNavigation } from "../../../components/MenuNavigation";
import {
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useTheme,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { FilterEvent } from "../../../components/FilterEvent";
import { EventList } from "@/src/components/EventList/EventList";
import { useFetchEvents } from "@/src/hooks";
import { TypeFetchEventsResult } from "@/src/hooks/useFetchEvents";
import { IQueryParams } from "../../../interfaces";

const EventsCatPage = (): JSX.Element => {
  // const [params, setParams] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const { query } = useRouter();
  const { cat } = query;
  const theme = useTheme();

  const cityName = cat ? String(cat).toLowerCase() : "";

  const params: IQueryParams = { page, limit };
  const [data, isLoading, error, fetchData]: TypeFetchEventsResult =
    useFetchEvents();

  useEffect(() => {
    if (cityName) fetchData({ cityName, params });
  }, [cityName]);

  const handleChangeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
    if (cityName) {
      fetchData({
        cityName,
        params: { ...params, page: 1, limit: newLimit },
      });
    }
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
    if (cityName) {
      fetchData({
        cityName,
        params: { ...params, page: newPageValue },
      });
    }
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    if (cityName) {
      fetchData({
        cityName,
        params: { ...params, page: newPageValue },
        loadMore: true,
      });
    }
  };

  const handleFetchByFilter = (queryParams: any) => {
    console.log("queryParams", queryParams);
    // fetchDataEvents({ page, isLoadingMore: false, queryParams });
  };

  const handleClearFilter = () => {
    // fetchDataEvents({ queryParams: {} });
  };

  const list = cityName
    ? [
        { title: "Home", path: "/", iconName: "home" },
        { title: "Cities", path: "/cities", iconName: "cities" },
        {
          title:
            cityName && cityName[0].toLocaleUpperCase() + cityName.slice(1),
          path: "",
          iconName: "city",
        },
      ]
    : null;

  return (
    <Container
      maxWidth="xl"
      sx={{
        color: theme.palette.text.primary,
        border: "1px solid green",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {list && <MenuNavigation list={list} />}

          {data && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "0.5rem",
                color: theme.palette.text.primary,
              }}
            >
              <Typography>All Events: {data.totalEvents}</Typography>
              <Typography>Displayed: {data.events.length}</Typography>
              <FormControl sx={{ minWidth: "5rem" }} size="small">
                <InputLabel>Count</InputLabel>
                <Select
                  value={limit}
                  label="Count"
                  onChange={(e) => handleChangeLimit(Number(e.target.value))}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", height: "100%" }}>
        {params && data && (
          <FilterEvent
            data={data.searchParams}
            handleFetchByFilter={handleFetchByFilter}
            handleClearFilter={handleClearFilter}
            isLoading={isLoading}
          />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: "1rem",
            width: "100%",
            border: "1px solid blue",
            flex: 1,
          }}
        >
          {data && data.events?.length > 0 && (
            <EventList events={data.events} cityName={cityName} />
          )}

          {data && data.events?.length < data.totalEvents && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <LoadingButton
                variant="text"
                loadingPosition="start"
                startIcon={<RefreshIcon />}
                loading={isLoading}
                onClick={handleLoadMore}
                sx={{
                  p: "0.75rem 2rem",
                  fontSize: "1rem",
                  color: "inherit",
                  textTransform: "none",
                }}
              >
                <span>Load more cities!</span>
              </LoadingButton>
            </Box>
          )}

          {data && data.events?.length < data.totalEvents && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "auto",
              }}
            >
              <Pagination
                count={Math.ceil(data.totalEvents / limit)}
                page={page}
                onChange={handleChangePage}
                disabled={isLoading}
              />
            </Box>
          )}
        </Box>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default EventsCatPage;
