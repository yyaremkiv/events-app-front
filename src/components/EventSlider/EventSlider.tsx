import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { IEventItem } from "../../interfaces";
import { Box, Typography, useTheme } from "@mui/material";

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 2000,
  arrows: false,
};

interface IEventSliderProps {
  events: IEventItem[];
  cityName: string;
}

export const EventSlider = ({
  events,
  cityName,
}: IEventSliderProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Slider {...settings}>
      {events.map(({ title, imagePath }: IEventItem, index: number) => (
        <Box key={index}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "1.5rem",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Box
            key={title}
            sx={{
              position: "relative",
              height: "15rem",
              width: "100%",
            }}
          >
            <Link
              href={`/cities/${cityName.toLowerCase()}/${title.toLowerCase()}`}
              style={{ textDecoration: "none" }}
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
                  width: "100%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Link>
          </Box>
        </Box>
      ))}
    </Slider>
  );
};
