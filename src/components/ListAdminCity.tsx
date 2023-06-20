import { useState } from "react";
import { ItemCity } from "./ItemCity";
import { Box, IconButton } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CityOperations from "../redux/cities/city.operations";

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";

export const ListAdminCity = ({
  data,
  handleUpdateCity,
  handleAddEvent,
  handleEditEvent,
}: any) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const dispatch = useDispatch();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDeleteCity = (cityId: any) =>
    // @ts-ignore
    dispatch(CityOperations.deleteCity(cityId));

  return (
    <Box>
      <ul>
        {data.map((city: any) => (
          <ItemCity
            key={city._id}
            data={city}
            handleUpdateCity={handleUpdateCity}
            handleAddEvent={handleAddEvent}
            handleEditEvent={handleEditEvent}
          />
        ))}
      </ul>

      {data.map((city: any, index: number) => (
        <Accordion
          key={index}
          expanded={expanded === city.city}
          onChange={handleChange(city.city)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography>{city.city}</Typography>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateCity(city._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCity(city._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ItemCity
              key={city._id}
              data={city}
              handleUpdateCity={handleUpdateCity}
              handleAddEvent={handleAddEvent}
              handleEditEvent={handleEditEvent}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
