import Link from "next/link";
import Image from "next/image";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { Event, PeopleAlt, Place, Public } from "@mui/icons-material";
import { useState } from "react";
import ScrollHandler from "react-scroll-wheel-handler";
// import { animateScroll as scroll } from "react-scroll";

interface IHomeCItyItemProps {
  data: any;
  index: number;
}

export const HomeCItyItem = ({
  data,
  index,
}: IHomeCItyItemProps): JSX.Element => {
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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: "flex",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        // padding: "1rem",
        gap: "1rem",
        background: theme.palette.background.gradientHeaderBg,
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "500px",
          overflow: "hidden",
          // border: "1px solid green",
          position: "relative",
        }}
      >
        <Link href={`/cities/${city.label.toLowerCase()}`}>
          <Image
            src={imagePath}
            alt={title}
            fill={true}
            priority={true}
            style={{
              objectFit: "cover",
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              textAlign: "right",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              color: theme.palette.background.paper,
              transform: isHovered ? "translateY(0%)" : "translateY(-100%)",
              background: theme.palette.background.blueGreyBg,
              transition: "transform 1000ms ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "140px",
              fontWeight: "800",
              opacity: "0.5",
            }}
          >
            {/* {city.label} */}
            {index < 10 ? `0${index + 1}` : `${index + 1}`}
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          width: "50%",
          // border: "1px solid green",
          // padding: "50px",
        }}
      >
        <Box
          sx={{
            padding: "30px",
            background: theme.palette.background.gradientCard,
            // borderRadius: "10px",
          }}
        >
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
            sx={{
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              textAlign: "left",
              // border: "1px solid blue",
            }}
          >
            <Grid
              item
              sx={{
                padding: "20px 10px",
              }}
              lg={6}
              sm={12}
            >
              <Box
                sx={{
                  background: theme.palette.background.glassBg,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Public
                    sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {city.country}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Event
                    sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    All events: {totalEvents}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Place
                    sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Population: {population}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <PeopleAlt
                    sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Location: {country.label}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item lg={5} sm={12}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary, textAlign: "center" }}
              >
                Soon: Festival Music
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  border: "1px solid green",
                  position: "relative",
                }}
              >
                <Link href={`/cities/${city.label.toLowerCase()}`}>
                  <Image
                    src={imagePath}
                    alt={title}
                    fill={true}
                    priority={true}
                    style={{
                      objectFit: "contain",
                      display: "block",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </Link>
              </Box>
            </Grid>

            <Grid item lg={12} sm={12}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "justify",
                  color: theme.palette.text.primary,
                }}
              >
                {description} Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Aperiam amet, exercitationem dolorem iure,
                corrupti maxime magni voluptatem fugit perspiciatis quis ut modi
                consectetur, esse eveniet consequatur. Eum neque eius soluta.
              </Typography>
            </Grid>

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
    </Box>
  );
};
