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
  Home as HomeIcon,
} from "@mui/icons-material";
import { AppDispatch } from "../../redux/store";
import { EventOperations } from "../../redux/event/event.operations";
import { ICityItem } from "../../interfaces";

interface IAdminListCitiesProps {
  data: ICityItem[];
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
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDeleteCity = (cityId: any) =>
    dispatch(EventOperations.deleteCity(cityId));

  console.log("data", data);

  return (
    <Box>
      {data.map((city: ICityItem, index: number) => (
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
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography sx={{ fontWeight: 500 }}>{city.city}</Typography>
                {city.showOnHomePage ? (
                  <Tooltip
                    title="This City Is Shown On The Main Page"
                    placement="top"
                  >
                    <HomeIcon />
                  </Tooltip>
                ) : null}
              </Box>
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
