import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EventService } from "../../../services/event.service";
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
import { EventList } from "@/src/components/EventList/EventList";

const EventsCatPage = (): JSX.Element => {
  const [events, setEvents] = useState([]);
  const [params, setParams] = useState<any>({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { cat } = router.query;

  const cityName = cat ? String(cat).toLowerCase() : null;

  useEffect(() => {
    async function fetch() {
      console.log("fetch", "cityName", cityName);
      const { data } = await EventService.getEvent({
        cityName,
        params: { page: 1, limit: 5 },
      });
      if (data) {
        setEvents(data.events);
        setParams(data.eventsParams);
      }
    }
    if (cat) fetch();
  }, [cat]);

  useEffect(() => {
    if (cat) fetchDataEvents({ page });
  }, [limit]);

  const handleChangeLimit = (value: number) => {
    setPage(1);
    setLimit(value);
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
    fetchDataEvents({ page: newPageValue });
  };

  const handleLoadMore = () => {
    const newPageValue = page + 1;
    setPage(newPageValue);
    fetchDataEvents({ page: newPageValue, isLoadingMore: true });
  };

  const handleFetchByFilter = (queryParams: any) => {
    fetchDataEvents({ page, isLoadingMore: false, queryParams });
  };

  const handleClearFilter = () => {
    fetchDataEvents({ queryParams: {} });
  };

  async function fetchDataEvents({
    page,
    isLoadingMore = false,
    queryParams,
  }: any) {
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
    } catch (err: any) {
      setError(err?.response?.data.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <Box>
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
              { title: "Cities", path: "/cities", iconName: "cities" },
              {
                title:
                  cityName &&
                  cityName[0].toLocaleUpperCase() + cityName.slice(1),
                path: "",
                iconName: "city",
              },
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
            <Typography>
              All Events: {params.totalEvents ? params.totalEvents : null}
            </Typography>
            <Typography>Displayed: {events?.length}</Typography>

            <FormControl sx={{ minWidth: 80 }} size="small">
              <InputLabel>Events</InputLabel>
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
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        {params && events.length > 0 && (
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
            border: "1px solid red",
          }}
        >
          {events?.length > 0 ? (
            <EventList data={events} cityNameLink={cat} isLoading={isLoading} />
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
    </Box>
  );
};

export default EventsCatPage;
