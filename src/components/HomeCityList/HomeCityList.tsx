import { useEffect } from "react";
import { HomeCItyItem } from "../HomeCItyItem/HomeCItyItem";
import { IEventItem } from "../../interfaces";
import { Box, Grid } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

interface IHomeCityListProps {
  data: IEventItem[];
}

export const HomeCityList = ({ data }: IHomeCityListProps): JSX.Element => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid container rowSpacing={1} sx={{ paddingBottom: "5rem" }}>
      {data.map((data: IEventItem, index: number) => (
        <Box key={index} data-aos="fade-up" data-aos-duration="2000">
          <HomeCItyItem data={data} index={index} />
        </Box>
      ))}
    </Grid>
  );
};
