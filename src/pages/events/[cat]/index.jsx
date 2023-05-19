import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CatEvent } from "@/components/Events/catEvent";
import EventService from "@/services/event.service";
import { Box } from "@mui/system";
import { MenuNavigation } from "@/components/MenuNavigation";
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
import { FilterEvent } from "@/components/FilterEvent";

const EventsCatPage = ({ data, totalCounts }) => {
  const [events, setEvents] = useState(data.events);
  const [totalEvents, setTotalEvents] = useState(totalCounts);
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

  async function fetchDataEvents({ page, isLoadingMore = false }) {
    setIsLoading(true);
    try {
      const { data } = await EventService.getEvent({
        cityName: cat,
        page,
        limit,
      });
      if (data.events) {
        const newEventsList = isLoadingMore
          ? [...events, ...data.events]
          : data.events;
        setEvents(newEventsList);
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
              <Typography>All Events: {totalEvents}</Typography>
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
          {/* Filter - start */}
          <FilterEvent />
          {/* Filter - end */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              p: "0.75rem",
              border: "1px solid tomato",
            }}
          >
            <CatEvent data={events} cityNameLink={cat} />
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
                count={Math.ceil(totalEvents / limit)}
                page={page}
                onChange={handleChangePage}
                disabled={isLoading}
              />
            </Box>
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
  const { data } = await EventService.getEvent({ cityName: city });

  return { props: { data: data.events, totalCounts: data.totalEvents } };
}
