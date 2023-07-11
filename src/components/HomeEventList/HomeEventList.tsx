import { useEffect } from "react";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import AOS from "aos";
import { Chair, EventNote as EventNoteIcon } from "@mui/icons-material";
import { ItemIconText } from "../ItemIconText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeEventList = ({ events }: any): JSX.Element => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init();
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    arrows: false,
    dots: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 },
      },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "600px",
        marginBottom: "100px",
        position: "relative",
        gap: "1rem",
        padding: "1rem",
        cursor: "grab",
      }}
    >
      <Slider {...settings}>
        {events.map(
          (
            {
              country,
              city,
              title,
              description,
              seats,
              date,
              categories,
              imagePath,
            }: any,
            index: number
          ) => (
            <Box
              key={index}
              sx={{
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
                overflow: "hidden",
                borderRadius: "10px",
                position: "relative",
                transition: "all 300ms ease-in-out",
                gap: "1rem",

                "&:hover": {
                  transform: "scale(1.05)",
                },
                "&:hover .eventIfo": {
                  transform: "translateY(-70px)",
                  color: theme.palette.text.light,
                },
                "&:hover .eventTitle": {
                  transform: "translateY(-70px)",
                  color: theme.palette.text.light,
                  textShadow: `-2px -2px 5px ${theme.palette.text.main}, 5px 5px 5px ${theme.palette.text.main}`,
                  background: theme.palette.background.gradientHeaderBg,
                },
                "&:hover .eventLocation": {
                  transform: "translateY(200px)",
                  background: theme.palette.background.gradientHeaderBg,
                  textShadow: `-2px -2px 5px ${theme.palette.text.main}, 5px 5px 5px ${theme.palette.text.main}`,
                  color: theme.palette.text.light,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  minHeight: "450px",
                  borderRadius: "10px 10px 0 0",
                  overflow: "hidden",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 0,
                  marginBottom: "5px",
                }}
              >
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
                    zIndex: 0,
                  }}
                />
              </Box>

              <Box
                className="eventLocation"
                sx={{
                  zIndex: 20,
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.2rem",
                  borderRadius: "10px",
                  padding: "0.5rem",
                  color: theme.palette.text.main,
                  position: "absolute",
                  top: 10,
                  left: 25,
                  right: 25,
                  transition: "all 400ms ease-in-out",
                }}
              >
                <ItemIconText text={city.label} />

                <Box>
                  <img
                    loading="lazy"
                    width="50"
                    height="50"
                    src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png 2x`}
                    alt="alt"
                    style={{
                      margin: "0 auto",
                      display: "block",
                      padding: "3px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                </Box>
                <ItemIconText text={country.label} />
              </Box>

              <Box
                className="eventIfo"
                sx={{
                  minHeight: "230px",
                  display: "flex",
                  displayWrap: "wrap",
                  flexDirection: "column",
                  gap: "0.3rem",
                  padding: "0.3rem 1rem",
                  background: theme.palette.background.gradientCard,
                  borderRadius: "0 0 10px 10px",
                  justifyContent: "center",
                  color: theme.palette.text.disabled,
                  position: "relative",

                  transition: "all 300ms ease-in-out",

                  "&::before": {
                    content: `''`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "50%",
                    background: theme.palette.background.gradientBg1,
                    opacity: "0.67",
                    zIndex: -1,
                    borderRadius: "0 0 0 10px",
                  },
                }}
              >
                <Typography
                  className="eventTitle"
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    textAlign: "center",
                    borderRadius: "10px 10px",
                    padding: "5px 7px",
                    color: theme.palette.text.disabled,
                    transition: "all 400ms linear",
                    background: theme.palette.background.gradientCard,
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    textAlign: "center",
                    maxHeight: "50px",
                    overflow: "hidden",
                  }}
                >
                  {description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <ItemIconText
                    text={date.split("").slice(4, 16).join("")}
                    Component={
                      <EventNoteIcon
                        sx={{
                          border: `1px solid ${theme.palette.text.main}`,
                          borderRadius: "50%",
                          padding: "3px 5px",
                          fontSize: "2rem",
                        }}
                      />
                    }
                  />
                  <ItemIconText
                    text={seats}
                    Component={
                      <Chair
                        sx={{
                          border: `1px solid ${theme.palette.text.main}`,
                          borderRadius: "50%",
                          padding: "3px 5px",
                          fontSize: "2rem",
                        }}
                      />
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {categories?.map(({ label, color }: any, index: number) => (
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
                  ))}
                </Box>
              </Box>
            </Box>
          )
        )}
      </Slider>
    </Box>
  );
};
