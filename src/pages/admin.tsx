import { useState } from "react";
import { useAuth, useCity } from "../hooks";
import { ModalCity } from "../components/ModalCity/ModalCity";
import { ModalEvent } from "../components/ModalEvent/ModalEvent";
import { ModalWindow } from "../components/ModalWindows";
import { AdminListCities } from "../components/AdminListCities/AdminListCities";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const Admin = (): JSX.Element => {
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
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 0",
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            List Of All Cities:
          </Typography>

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
      </Box>

      <ModalWindow open={openModal} onCloseFunc={handleModalClose}>
        {typeModal === "city" && (
          <ModalCity cityId={cityId} isLoading={isLoading} />
        )}

        {typeModal === "event" && (
          <ModalEvent
            cityId={cityId}
            eventId={eventId}
            // @ts-ignore
            handleAddEvent={handleAddEvent}
          />
        )}
      </ModalWindow>
    </Box>
  );
};

export default useAuth(Admin);
