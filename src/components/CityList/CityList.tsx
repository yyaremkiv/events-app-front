import Image from "next/image";
import Link from "next/link";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Place, Celebration as CelebrationIcon } from "@mui/icons-material";
import { CityItem } from "../CityItem/CityItem";
import { ICityItem } from "../../interfaces";

interface ICityListProps {
  cities: ICityItem[];
}

export const CityList = ({ cities }: ICityListProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ width: "100%" }}>
      {cities?.map((cityItem: ICityItem) => (
        <Grid
          item
          key={cityItem._id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          // sx={{ padding: "1rem" }}
        >
          <Link
            href={`/cities/${cityItem.city.label.toLowerCase()}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              width: "100%",
              border: "1px solid blue",
            }}
          >
            <CityItem data={cityItem} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
