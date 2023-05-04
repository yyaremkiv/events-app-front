import { useState } from "react";
import { ItemCity } from "./ItemCity";
import { Box, Modal } from "@mui/material";
import { ModalEvent } from "./ModalEvent";

export const ListCity = ({ data, handleUpdateCity, handleAddEvent }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cityId, setCityId] = useState(null);

  const handleCloseModal = () => setOpenModal(!modalOpen);
  const handleModalClose = () => setOpenModal(false);

  // const handleAddEvent = (id) => {
  //   setCityId(id);
  //   setOpenModal(true);
  // };

  return (
    <Box>
      <ul>
        {data.map((city) => (
          <ItemCity
            key={city._id}
            data={city}
            handleUpdateCity={handleUpdateCity}
            handleAddEvent={handleAddEvent}
          />
        ))}
      </ul>

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
          {/* <ModalEvent id={cityId} /> */}
        </Box>
      </Modal>
    </Box>
  );
};
