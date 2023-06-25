import { useCity } from "@/src/hooks";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { AdminListCities } from "../AdminListCities/AdminListCities";
import { ModalWindow } from "../ModalWindows";
import { ModalCity } from "../ModalCity/ModalCity";
import { ModalEvent } from "../ModalEvent/ModalEvent";

export const AdminTabEvents = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [cities, isLoading, error] = useCity();
  const theme = useTheme();

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
          justifyContent: "right",
          alignItems: "center",
          padding: "0.5rem 0",
        }}
      >
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
        <AdminListCities
          data={cities}
          handleUpdateCity={handleUpdateCity}
          handleAddEvent={handleAddEvent}
          handleEditEvent={handleEditEvent}
        />
      )}

      <ModalWindow open={openModal} onCloseFunc={handleModalClose}>
        {typeModal === "city" && (
          <ModalCity
            cityId={cityId}
            handleCloseModal={handleModalClose}
            isLoading={isLoading}
          />
        )}

        {typeModal === "event" && (
          <ModalEvent
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
