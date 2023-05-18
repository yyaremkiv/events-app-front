import { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalCity } from "@/components/ModalCity";
import { ModalEvent } from "@/components/ModalEvent";

import { ListCity } from "@/components/ListCity";
import {
  Box,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CityOperations from "@/redux/cities/city.operations";
import { useGetCity } from "@/hooks/useCity";
import { useAuth } from "@/hooks/useAuth";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [cities, isLoading, error] = useGetCity();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setCityId(null);
    setEventId(null);
    setOpenModal(false);
  };

  const handleAddCity = (formData) =>
    dispatch(CityOperations.addCity(formData));

  const handleUpdateCity = (cityId) => {
    setCityId(cityId);
    setTypeModal("city");
    setOpenModal(true);
  };

  const handleAddEvent = (cityId) => {
    setCityId(cityId);
    setTypeModal("event");
    setOpenModal(true);
  };

  const handleEditEvent = ({ cityId, eventId }) => {
    setCityId(cityId);
    setEventId(eventId);
    setTypeModal("event");
    setOpenModal(true);
  };

  return (
    <div>
      <div style={{ display: "grid", padding: "2rem" }}>
        <Box
          sx={{
            display: "fles",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid red",
            padding: "0.5rem",
          }}
        >
          <Typography style={{ fontWeight: 600 }}>List of cities</Typography>
          <Input />
          <Tooltip title="Add new city" placement="top">
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
        {isLoading ? <CircularProgress /> : null}
        {cities.length ? (
          <ListCity
            data={cities}
            handleUpdateCity={handleUpdateCity}
            handleAddEvent={handleAddEvent}
            handleEditEvent={handleEditEvent}
          />
        ) : null}
      </div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: "1rem",
            maxWidth: {
              xs: "90vw",
              sm: "80vw",
              md: "60vw",
              lg: "50vw",
              xl: "40vw",
            },
            width: "100%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {typeModal === "city" && (
            <ModalCity cityId={cityId} handleAddCity={handleAddCity} />
          )}

          {typeModal === "event" && (
            <ModalEvent
              cityId={cityId}
              eventId={eventId}
              handleAddEvent={handleAddEvent}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default useAuth(Admin);
