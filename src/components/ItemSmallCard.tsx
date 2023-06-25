import { Box, Typography, Grid, Button } from "@mui/material";
import { Public, Place, PeopleAlt, Event } from "@mui/icons-material";

export const ItemSmallCardsdfsdf = ({
  title,
  description,
  country,
  totalEvents,
  population,
}: any) => {
  return (
    <Box sx={{ padding: "30px 50px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontSize: "32px", fontWeight: "700" }}
      >
        {title}
      </Typography>

      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          textAlign: "left",
          padding: "20px 10px",
          borderBottom: "1px solid black",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Public fontSize="large" />
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            {country}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Event fontSize="large" />
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            All events: {totalEvents}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Place fontSize="large" />
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            Population: {population}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <PeopleAlt fontSize="large" />
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            Location: {country}
          </Typography>
        </Grid>

        <Typography
          variant="h6"
          sx={{ textAlign: "justify", marginBottom: "18px" }}
        >
          {description} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aperiam amet, exercitationem dolorem iure, corrupti maxime magni
          voluptatem fugit perspiciatis quis ut modi consectetur, esse eveniet
          consequatur. Eum neque eius soluta.
        </Typography>

        <Button
          variant="outlined"
          sx={{
            margin: "auto",
            display: "block",
            padding: "10px 34px",
            borderRadius: "24px",
          }}
        >
          Read More
        </Button>
      </Grid>
    </Box>
  );
};
