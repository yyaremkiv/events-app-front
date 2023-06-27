import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Chip,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";

export const ListEvents = ({ data, cityNameLink, isLoading }: any) => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {data?.map(
          ({
            id,
            title,
            imagePath,
            description,
            date,
            seats,
            categories,
          }: any) => (
            <Box sx={{ width: "25%" }}>
              <Link
                key={id}
                href={`/cities/${cityNameLink.toLowerCase()}/${title}`}
                style={{ border: "1px solid red" }}
              >
                <Image
                  src={imagePath}
                  alt={title}
                  width={300}
                  height={300}
                  priority={true}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="h4">Title: {title}</Typography>
                <Typography>Descrition: {description}</Typography>
                <Typography>Data: {date}</Typography>
                <Typography>Seats: {seats}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                  {categories?.map((cat: any, index: number) => (
                    <Chip key={index} label={cat} variant="outlined" />
                  ))}
                </Box>
              </Link>
            </Box>
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
