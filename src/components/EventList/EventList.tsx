import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Grid,
  Chip,
  useTheme,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";

import { CardItem } from "./CardItem";

export const EventList = ({
  data,
  cityNameLink,
  isLoading,
}: any): JSX.Element => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ border: "1px solid green", width: "100%" }}>
      <Grid
        container
        sx={{
          position: "relative",
          width: "100%",
          color: theme.palette.text.primary,
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
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              sx={{
                padding: "1rem",
                width: "25%",
              }}
            >
              <Link
                key={id}
                href={`/cities/${cityNameLink.toLowerCase()}/${title}`}
                style={{
                  border: "1px solid red",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <CardItem
                  imagePath={imagePath}
                  title={title}
                  description={description}
                  mainTitle={title}
                  leftPoint={date}
                  rightPoint={`Seats: ${seats}`}
                />
              </Link>
            </Grid>
          )
        )}
        {isLoading && (
          <Box sx={{ position: "absolute", width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
    </Container>
  );
};
