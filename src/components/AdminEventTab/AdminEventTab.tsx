import { useState } from "react";
import { ModalWindow } from "../ModalWindows";
import { CityModal } from "../CityModal/CityModal";
import { EventModal } from "../EventModal/EventModal";
import { AdminCityList } from "../AdminCityList/AdminCityList";
import { useCity } from "../../hooks";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  HideSource as HideSourceIcon,
  AddHome as AddHomeIcon,
} from "@mui/icons-material";

export const AdminEventTab = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [cities, isLoading, error] = useCity();

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

      {Boolean(cities.length) && (
        <AdminCityList
          data={cities}
          handleUpdateCity={handleUpdateCity}
          handleAddEvent={handleAddEvent}
          handleEditEvent={handleEditEvent}
          isLoading={isLoading}
        />
      )}

      <ModalWindow open={openModal} onCloseFunc={handleModalClose}>
        {typeModal === "city" && (
          <CityModal
            cityId={cityId}
            handleCloseModal={handleModalClose}
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
