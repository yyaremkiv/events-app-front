import { useEffect } from "react";
import { HomeCItyItem } from "../HomeCItyItem/HomeCItyItem";
import { ICityItem } from "../../interfaces";
import { Box, Grid } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

interface IHomeCityListProps {
  cities: ICityItem[];
}

export const HomeCityList = ({ cities }: IHomeCityListProps): JSX.Element => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid container rowSpacing={1} sx={{ paddingBottom: "5rem" }}>
      {cities.map((data: ICityItem, index: number) => (
        <Box key={index} data-aos="fade-up" data-aos-duration="2000">
          <HomeCItyItem data={data} index={index} />
        </Box>
      ))}
    </Grid>
  );
};
