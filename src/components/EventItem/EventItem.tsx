import Image from "next/image";
import { IEventItem } from "@/src/interfaces";
import { Box, Typography, Chip, useTheme } from "@mui/material";

interface IEventItemProps {
  event: IEventItem;
  isLoading?: boolean;
}

export const EventItem = ({
  event,
  isLoading = false,
}: IEventItemProps): JSX.Element => {
  const { title, description, imagePath, date, seats, categories } = event;
  const theme = useTheme();

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Box sx={{ display: "flex" }}>
        {imagePath ? (
          <Box sx={{ width: "400px" }}>
            <Image
              src={imagePath}
              width={400}
              height={300}
              alt={title}
              style={{ display: "block", width: "100%", height: "auto" }}
              priority={true}
            />
          </Box>
        ) : null}

        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h4">Title: {title}</Typography>
          <Typography variant="h4">Description: {description}</Typography>
          <Typography variant="h5">Data: {date}</Typography>
          <Typography variant="h5">Seats: {seats}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {categories?.map(({ label, color }, index: number) => (
              <Chip
                key={index}
                label={label}
                variant="outlined"
                style={{
                  color: "white",
                  backgroundColor: color,
                  marginRight: "5px",
                  border: "none",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
