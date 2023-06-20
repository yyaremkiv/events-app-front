import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminItemCity } from "../AdminItemCity/AdminItemCity";
import {
  Box,
  IconButton,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import CityOperations from "../../redux/cities/city.operations";

interface IAdminListCitiesProps {
  data: any;
  handleUpdateCity: any;
  handleAddEvent: any;
  handleEditEvent: any;
}

export const AdminListCities = ({
  data,
  handleUpdateCity,
  handleAddEvent,
  handleEditEvent,
}: IAdminListCitiesProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const dispatch = useDispatch();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDeleteCity = (cityId: any) =>
    // @ts-ignore
    dispatch(CityOperations.deleteCity(cityId));

  return (
    <Box>
      {data.map((city: any, index: number) => (
        <Accordion
          key={index}
          expanded={expanded === city.city}
          onChange={handleChange(city.city)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "1rem",
                width: "100%",
              }}
            >
              <Typography>{city.city}</Typography>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Tooltip title="Update City" placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateCity(city._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete City" placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCity(city._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === city.city && (
              <AdminItemCity
                key={city._id}
                data={city}
                // handleUpdateCity={handleUpdateCity}
                handleAddEvent={handleAddEvent}
                handleEditEvent={handleEditEvent}
              />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
