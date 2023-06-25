import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

export const ListCities = ({ data }: any) => {
  return (
    <Box sx={{ padding: "1rem 0" }}>
      <Grid container spacing={1}>
        {data?.map(({ _id, city, title, totalEvents, imagePath }: any) => (
          <Grid
            key={_id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href={`/events/${city.toLowerCase()}`}>
              <Image
                src={imagePath}
                alt={title}
                width={400}
                height={200}
                priority={true}
                style={{ width: "100%", height: "auto" }}
              />
              <h2>{city}</h2>
              <Typography>Count events: {totalEvents}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
