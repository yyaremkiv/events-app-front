import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export const EventSlider = ({ events, cityName }: any) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <Box sx={{ width: "20rem" }}>
      <Slider {...settings}>
        {events.map(({ title, imagePath }: any) => (
          <Box key={title}>
            <Link
              href={`/cities/${cityName.toLowerCase()}/${title.toLowerCase()}`}
            >
              <Image
                src={imagePath}
                alt={title}
                width={600}
                height={200}
                priority={true}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <Typography>Title: {title}</Typography>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
