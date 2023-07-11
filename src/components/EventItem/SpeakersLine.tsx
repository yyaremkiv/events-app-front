import { Box } from "@mui/material";
import { SpeakerItem } from "./SpeakerItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SpeakersLine = ({ speakers }: any) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Slider {...settings}>
        {speakers &&
          speakers.map((speaker: any) => (
            <SpeakerItem
              id={speaker.id}
              firstname={speaker.firstname}
              lastname={speaker.lastname}
              age={speaker.age}
              topic={speaker.topic}
              about={speaker.about}
            />
          ))}
      </Slider>
    </Box>
  );
};
