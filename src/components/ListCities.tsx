import { Box, Grid, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { GridWrapper } from "./GridWrapper";
import Link from "next/link";
import Image from "next/image";
import { ItemSmallCard } from "./ItemSmallCard";

import AOS from "aos";
import "aos/dist/aos.css";
import { ItemCityCard } from "./ItemCityCard";

export const ListCities = ({ data }: any) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid container rowSpacing={1} sx={{ paddingBottom: "5rem" }}>
      {data.cities
        .filter((city: any) => city.showOnHomePage)
        .map((data: any, index: number) => (
          <Box key={index} data-aos="fade-up" data-aos-duration="2000">
            <ItemCityCard data={data} index={index} />
          </Box>
        ))}
    </Grid>
  );
};