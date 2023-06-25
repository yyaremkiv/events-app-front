import { useEffect } from "react";
import { ItemEventHomeCard } from "../ItemEventHomeCard/ItemEventHomeCard";
import { IEventItem } from "../../interfaces";
import { Box, Grid } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

interface IListHomeCitiesProps {
  data: IEventItem[];
}

export const ListHomeCities = ({ data }: IListHomeCitiesProps): JSX.Element => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid container rowSpacing={1} sx={{ paddingBottom: "5rem" }}>
      {data.map((data: IEventItem, index: number) => (
        <Box key={index} data-aos="fade-up" data-aos-duration="2000">
          <ItemEventHomeCard data={data} index={index} />
        </Box>
      ))}
    </Grid>
  );
};
