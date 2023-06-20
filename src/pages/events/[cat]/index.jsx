import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CatEvent } from "../../../components/Events/catEvent";
import EventService from "../../../services/event.service";
import { Box } from "@mui/system";
import { MenuNavigation } from "../../../components/MenuNavigation";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FilterEvent } from "../../../components/FilterEvent";

const EventsCatPage = ({ data, eventsParams }) => {
  const [events, setEvents] = useState(data.events);
  const [params, setParams] = useState(eventsParams);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { cat } = router.query;

  const cityName = cat[0].toUpperCase() + cat.slice(1);

  useEffect(() => {
    fetchDataEvents({ page });
  }, [limit]);

  const handleChangeLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  const handleChangePage = (_, newPageValue) => {
    setPage(newPageValue);
    fetchDataEvents({ page: newPageValue });
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    fetchDataEvents({ page: newPageValue, isLoadingMore: true });
  };

  const handleFetchByFilter = (queryParams) => {
    fetchDataEvents({ page, isLoadingMore: false, queryParams });
  };

  const handleClearFilter = () => {
    fetchDataEvents({ queryParams: {} });
  };

  async function fetchDataEvents({ page, isLoadingMore = false, queryParams }) {
    setIsLoading(true);
    try {
      const { data } = await EventService.getEvent({
        cityName: cat,
        params: { page, limit, ...queryParams },
      });
      if (data.events || data.eventsParams) {
        const newEventsList = isLoadingMore
          ? [...events, ...data.events]
          : data.events;
        setEvents(newEventsList);
        setParams(data.eventsParams);
      }
    } catch (err) {
      setError(err?.response?.data.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <Box>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <MenuNavigation
              list={[
                { title: "Home", path: "/", iconName: "home" },
                { title: cityName, path: "", iconName: "city" },
              ]}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "0.5rem",
              }}
            >
              <Typography>All Events: {params.totalEvents}</Typography>
              <Typography>Displayed: {events?.length}</Typography>

              <FormControl sx={{ minWidth: 80 }} size="small">
                <InputLabel>Events</InputLabel>
                <Select
                  value={limit}
                  label="Count"
                  onChange={(e) => handleChangeLimit(e.target.value)}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container>
        <Box sx={{ display: "flex" }}>
          {params && (
            <FilterEvent
              data={params}
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
            }}
          >
            {events?.length > 0 ? (
              <CatEvent
                data={events}
                cityNameLink={cat}
                isLoading={isLoading}
              />
            ) : null}

            {events?.length < params.totalEvents && (
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
            )}

            {events?.length < params.totalEvents && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <Pagination
                  count={Math.ceil(params.totalEvents / limit)}
                  page={page}
                  onChange={handleChangePage}
                  disabled={isLoading}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const cities = await EventService.getCity({ limit: 10 });
  const AllPath = cities.data.cities.map((ev) => {
    return { params: { cat: ev.city.toLowerCase() } };
  });

  return { paths: AllPath, fallback: false };
}

export async function getStaticProps(context) {
  const city = context?.params.cat;
  const { data } = await EventService.getEvent({
    cityName: city,
    params: { page: 1, limit: 5 },
  });

  return { props: { data: data.events, eventsParams: data.eventsParams } };
}
