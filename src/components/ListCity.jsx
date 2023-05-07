import { ItemCity } from "./ItemCity";
import { Box } from "@mui/material";

export const ListCity = ({
  data,
  handleUpdateCity,
  handleAddEvent,
  handleEditEvent,
}) => {
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
