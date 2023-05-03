import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormCity } from "@/components/FormCity/FormCity";

import EventService from "@/services/EventService";

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

import { useGetCity } from "@/components/hooks/useCity";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [cities, isLoading, error] = useGetCity();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAddCity = async (formData) =>
    dispatch(CityOperations.addCity(formData));

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
            <IconButton onClick={() => setOpenModal(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {isLoading ? <CircularProgress /> : null}
        {cities.length ? <ListCity data={cities} /> : null}
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
          <FormCity handleAddCity={handleAddCity} />
        </Box>
      </Modal>
    </div>
  );
};

export default Admin;
