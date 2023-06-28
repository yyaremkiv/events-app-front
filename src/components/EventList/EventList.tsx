import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Chip,
  useTheme,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";

export const EventList = ({ data, cityNameLink, isLoading }: any) => {
  const theme = useTheme();

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
            <Box
              key={id}
              sx={{
                width: "25%",
                backgroundColor: theme.palette.background.light,
                border: "1px solid green",
                overflow: "hidden",
                borderRadius: "1rem",
              }}
            >
              <Link
                key={id}
                href={`/cities/${cityNameLink.toLowerCase()}/${title}`}
                style={{ border: "1px solid red", textDecoration: "none" }}
              >
                <Image
                  src={imagePath}
                  alt={title}
                  width={300}
                  height={300}
                  priority={true}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <Box sx={{ color: theme.palette.text.primary }}>
                  <Typography variant="h4">Title: {title}</Typography>
                  <Typography>Descrition: {description}</Typography>
                  <Typography>Data: {date}</Typography>
                  <Typography>Seats: {seats}</Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
                  >
                    {categories?.map(
                      (
                        { label, color }: { label: string; color: string },
                        index: number
                      ) => (
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
                      )
                    )}
                  </Box>
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
