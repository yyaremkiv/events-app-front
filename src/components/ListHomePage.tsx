import { Box, Grid, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { GridWrapper } from "./GridWrapper";
import Link from "next/link";
import Image from "next/image";
import { ItemSmallCard } from "./ItemSmallCard";

import AOS from "aos";
import "aos/dist/aos.css";

export const ListHomePage = ({ data }: any) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid
      container
      rowSpacing={1}
      sx={{ padding: "20px 0", marginBottom: "100px" }}
    >
      {data.cities
        .filter((city: any) => city.showOnHomePage)
        .map((ev: any, index: number) => (
          <Box key={index} data-aos="fade-up" data-aos-duration="2000">
            <GridWrapper key={ev.id} isEven={index % 2 === 0}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "500px",
                  overflow: "hidden",
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
                alignItems={`${index % 2 === 0 ? "end" : "start"}`}
              >
                <Link href={`/events/${ev.city.toLowerCase()}`}>
                  <ImageListItem
                    sx={{
                      width: "80%",
                      height: "auto",
                      transition: "transform 500ms linear",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <Image
                      src={ev.imagePath}
                      alt={ev.title}
                      width={800}
                      height={500}
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </ImageListItem>
                </Link>
              </Box>
              <ItemSmallCard
                title={ev.title}
                description={ev.description}
                country={ev.country}
                totalEvents={ev.totalEvents}
                population={ev.population}
              />
            </GridWrapper>
          </Box>
        ))}
    </Grid>
  );
};
