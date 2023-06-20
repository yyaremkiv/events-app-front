import { Event, PeopleAlt, Place, Public } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  ImageListItem,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ICityData } from "../interfaces";

export const ItemCityCard = ({ data, index }: any) => {
  const {
    city,
    imagePath,
    title,
    country,
    totalEvents,
    population,
    description,
  } = data;
  const theme = useTheme();

  console.log("data", data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        padding: "1rem 0",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          maxHeight: "500px",
          overflow: "hidden",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          border: "1px solid green",
        }}
      >
        <Link href={`/events/${city.toLowerCase()}`}>
          <ImageListItem
            sx={{
              width: "80%",
              height: "auto",
              transition: "transform 500ms linear",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <Image
              src={imagePath}
              alt={title}
              width={800}
              height={500}
              priority={true}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </ImageListItem>
        </Link>
      </Box>

      <Box sx={{ padding: "2rem", width: "50%" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            textAlign: "center",
            color: theme.palette.text.primary,
          }}
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
            <Public
              sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {country}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Event
              sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              All events: {totalEvents}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Place
              sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              Population: {population}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <PeopleAlt
              sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              Location: {country}
            </Typography>
          </Grid>

          <Typography
            variant="h6"
            sx={{
              textAlign: "justify",
              color: theme.palette.text.primary,
            }}
          >
            {description} Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aperiam amet, exercitationem dolorem iure, corrupti maxime
            magni voluptatem fugit perspiciatis quis ut modi consectetur, esse
            eveniet consequatur. Eum neque eius soluta.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem 0",
              width: "100%",
            }}
          >
            <Button sx={{ padding: "0.5rem 2rem", textDecoration: "none" }}>
              Read More
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
