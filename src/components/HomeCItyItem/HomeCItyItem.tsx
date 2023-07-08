import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ICityItem } from "@/src/interfaces";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Event, PeopleAlt, Place, Public } from "@mui/icons-material";
import { EventSlider } from "../EventSlider/EventSlider";

function formatPopulation(population: number): string {
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = Math.floor(Math.log10(population) / 3);

  return (
    (population / Math.pow(1000, suffixIndex)).toFixed(2) +
    suffixes[suffixIndex]
  );
}

interface IHomeCItyItemProps {
  data: ICityItem;
  index: number;
}

export const HomeCItyItem = ({
  data,
  index,
}: IHomeCItyItemProps): JSX.Element => {
  const { country, city, events, imagePath, totalEvents, description } = data;
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: isMobile ? "block" : "flex",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        gap: "2rem",
        padding: "2rem",
        background: theme.palette.background.gradientBg1,
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginBottom: isMobile ? "2rem" : 0,
          width: isMobile ? "100%" : "50%",
          minHeight: "25rem",
          overflow: "hidden",
        }}
      >
        <Link href={`/cities/${city.label.toLowerCase()}`}>
          <Image
            src={imagePath}
            alt={city.label}
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
            {index < 10 ? `0${index + 1}` : `${index + 1}`}
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: index % 2 === 0 ? "row-reverse" : "row",
            alignItems: "start",
            justifyContent: "space-between",
            padding: "30px",
            background: theme.palette.background.blueGrey100,
            borderRadius: "1.5rem",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                fontSize: "42px",
                textAlign: "center",
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.text.primary}`,
                padding: "20px 10px",
                marginBottom: "30px",
              }}
            >
              {city.label}
            </Typography>

            {/* ---------------------------------------------------------------------------------------- */}

            <Box>
              <EventSlider events={events} cityName={city.label} />
            </Box>

            {/* ---------------------------------------------------------------------------------------- */}
          </Box>

          <Box sx={{ width: "50%", color: theme.palette.text.primary }}>
            <Box sx={{ padding: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Public
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.text.primary,
                  }}
                />
                <Typography variant="h6" sx={{ color: "inherit" }}>
                  {country.label}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Event
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.text.primary,
                  }}
                />
                <Typography variant="h6" sx={{ color: "inherit" }}>
                  All events: {totalEvents}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Place
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.text.primary,
                  }}
                />
                <Typography variant="h6" sx={{ color: "inherit" }}>
                  Population: {formatPopulation(city.population)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <PeopleAlt
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.text.primary,
                  }}
                />
                <Typography variant="h6" sx={{ color: "inherit" }}>
                  Location: {city.label}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h6"
              sx={{
                textAlign: "justify",
                color: theme.palette.text.light,
                padding: "1rem",
              }}
            >
              {description}
            </Typography>
          </Box>

          <Button
            sx={{
              padding: "0.5rem 2rem",
              textDecoration: "none",
              borderRadius: "20px",
            }}
            variant="outlined"
          >
            Read More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
