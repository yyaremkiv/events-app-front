import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Chip,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";

export const CatEvent = ({ data, cityNameLink, isLoading }) => {
  return (
    <Container>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {data?.map(
          ({ id, title, imagePath, description, date, seats, categories }) => (
            <Link
              key={id}
              href={`/events/${cityNameLink.toLowerCase()}/${title}`}
              className={css.card}
              style={{ border: "1px solid red" }}
            >
              <Image
                src={imagePath}
                alt={title}
                width={300}
                height={300}
                priority={true}
                style={{ width: "auto", height: "auto" }}
              />
              <Typography variant="h4">Title: {title}</Typography>
              <Typography>Descrition: {description}</Typography>
              <Typography>Data: {date}</Typography>
              <Typography>Seats: {seats}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {categories?.map((cat, index) => (
                  <Chip key={index} label={cat} variant="outlined" />
                ))}
              </Box>
            </Link>
          )
        )}
        {isLoading && (
          <Box sx={{ position: "absolute", width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};
