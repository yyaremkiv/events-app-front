import { useEffect, useState } from "react";
import { ModalWindow } from "../ModalWindows";
import { CityModal } from "../CityModal/CityModal";
import { EventModal } from "../EventModal/EventModal";
import { AdminCityList } from "../AdminCityList/AdminCityList";
import { useCityFromRedux } from "../../hooks";
import { FetchUseCityFromReduxResult } from "../../hooks/useCityFromRedux";
import { Add as AddIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  FormControl,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Pagination } from "@mui/lab";
import {
  Home as HomeIcon,
  HideSource as HideSourceIcon,
  AddHome as AddHomeIcon,
} from "@mui/icons-material";

export const AdminEventTab = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [
    data,
    totalCities,
    isLoading,
    error,
    fetchData,
  ]: FetchUseCityFromReduxResult = useCityFromRedux({ page, limit });
  const theme = useTheme();

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handleModalClose = () => {
    setCityId(null);
    setEventId(null);
    setOpenModal(false);
  };

  const handleUpdateCity = (cityId: string) => {
    setCityId(cityId);
    setTypeModal("city");
    setOpenModal(true);
  };

  const handleAddEvent = (cityId: string) => {
    setCityId(cityId);
    setTypeModal("event");
    setOpenModal(true);
  };

  const handleEditEvent = ({
    cityId,
    eventId,
  }: {
    cityId: string;
    eventId: string;
  }) => {
    setCityId(cityId);
    setEventId(eventId);
    setTypeModal("event");
    setOpenModal(true);
  };

  const handleChangeLimit = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
    // fetchData({ params: { ...params, page: 1, limit: newLimit } });
  };

  const handleChangePage = (_: any, newPageValue: number) => {
    setPage(newPageValue);
    // fetchData({ params: { ...params, page: newPageValue } });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <HomeIcon />
            <Typography> - Show City Or Event On Home Page</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <HideSourceIcon color="error" />
            <Typography color="error"> - Hide City Or Event</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <AddHomeIcon />
            <Typography>
              - Show Event On City In Home Page (show only 1 event)
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Add New City" placement="top">
          <IconButton
            onClick={() => {
              setTypeModal("city");
              setOpenModal(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "2rem",
          padding: "10px 0",
        }}
      >
        {data.length > 0 ? (
          <Typography
            sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap" }}
          >
            Number of displayed cities: {data.length}
          </Typography>
        ) : null}

        {totalCities ? (
          <Typography
            sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap" }}
          >
            All city: {totalCities}
          </Typography>
        ) : null}

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
      </Box>

      {data.length > 0 && (
        <AdminCityList
          data={data}
          handleUpdateCity={handleUpdateCity}
          handleAddEvent={handleAddEvent}
          handleEditEvent={handleEditEvent}
          isLoading={isLoading}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "auto",
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

      <ModalWindow open={openModal} onCloseFunc={handleModalClose}>
        {typeModal === "city" && (
          <CityModal
            cityId={cityId}
            handleCloseModal={handleModalClose}
            error={error}
            isLoading={isLoading}
          />
        )}

        {typeModal === "event" && (
          <EventModal
            cityId={cityId}
            eventId={eventId}
            handleAddEvent={handleAddEvent}
            handleCloseModal={handleModalClose}
            error={error}
            isLoading={isLoading}
          />
        )}
      </ModalWindow>
    </Box>
  );
};
