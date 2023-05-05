import { useState } from "react";
import { ItemCity } from "./ItemCity";
import { Box, Modal } from "@mui/material";
import { ModalEvent } from "./ModalEvent";

export const ListCity = ({
  data,
  handleUpdateCity,
  handleAddEvent,
  handleEditEvent,
}) => {
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
            handleEditEvent={handleEditEvent}
          />
        ))}
      </ul>
    </Box>
  );
};
