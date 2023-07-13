import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  FilterEvent,
  ButtonLoadMore,
  DataDisplay,
  PaginationPage,
  MenuNavigation,
} from "../../../components";
import { EventList } from "../../../components/EventList/EventList";
import { useFetchEvents } from "../../../hooks";
import { TypeFetchEventsResult } from "../../../hooks/useFetchEvents";
import {
  Box,
  Typography,
  useTheme,
  Container,
  useMediaQuery,
} from "@mui/material";

const EventsCatPage = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [params, setParams] = useState<any>({ page, limit });
  const { query } = useRouter();
  const { cat } = query;
  const theme = useTheme();

  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktopScreen = useMediaQuery(theme.breakpoints.down("md"));
  console.log("isMobileScreen", isMobileScreen);

  const cityName = cat ? String(cat).toLowerCase() : "";

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
        params: { ...params, page: newPageValue, limit },
        loadMore: true,
      });
    }
  };

  const handleFetchByFilter = (queryParams: any) => {
    setParams(queryParams);
    fetchData({ cityName, params: { ...queryParams, page, limit } });
  };

  const handleClearFilter = () => {
    fetchData({ cityName, params: { page, limit } });
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0.5rem 0",
        }}
      >
        {list && <MenuNavigation list={list} />}

        {!!data?.totalEvents && !!data.events.length && (
          <DataDisplay
            label="Count"
            values={[
              { name: "All Events:", value: data.totalEvents },
              { name: "Displayed:", value: data.events.length },
            ]}
            valuesCount={[3, 5, 15]}
            limit={limit}
            limitChangeFunc={handleChangeLimit}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobileScreen ? "column" : "row",
          height: "100%",
        }}
      >
        <Box
          sx={{
            paddingBottom: "2rem",
            paddingRight: isMobileScreen ? 0 : "2rem",
            width: isMobileScreen ? "100%" : isDesktopScreen ? "45%" : "25%",
          }}
        >
          {data && false && (
            <FilterEvent
              data={data.searchParams}
              handleFetchByFilter={handleFetchByFilter}
              handleClearFilter={handleClearFilter}
              isLoading={isLoading}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: isMobileScreen ? "2rem" : 0,
            paddingBottom: "1rem",
            width: isMobileScreen ? "100%" : "75%",
          }}
        >
          {data && data.events?.length > 0 && (
            <EventList cityName={cityName} events={data.events} />
          )}

          {data &&
            data.totalEvents &&
            data.events?.length < data.totalEvents && (
              <ButtonLoadMore
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
              />
            )}

          {data &&
            data.totalEvents &&
            data.events?.length < data.totalEvents && (
              <PaginationPage
                page={page}
                limit={limit}
                totalCount={data.totalEvents}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
              />
            )}
        </Box>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default EventsCatPage;
