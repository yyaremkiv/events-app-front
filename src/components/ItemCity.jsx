import { useState } from "react";
import { useDispatch } from "react-redux";
import { ListEvent } from "./ListEvent";
import { Box, IconButton } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EventService from "@/services/EventService";
import CityOperations from "@/redux/cities/city.operations";

export const ItemCity = ({ data, handleAddEvent }) => {
  const [openList, setOpenList] = useState(false);
  const { _id: cityId, city } = data;
  const dispatch = useDispatch();

  const handleDeleteCity = (cityId) =>
    dispatch(CityOperations.deleteCity(cityId));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
        }}
      >
        <p>{city}</p>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteCity(cityId)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setOpenList(!openList)}>
            <ListIcon />
          </IconButton>
        </Box>
      </Box>
      {openList ? <ListEvent cityId={cityId} /> : null}
    </Box>
  );
};
