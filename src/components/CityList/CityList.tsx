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
    <Box
      sx={{
        padding: "24px 0",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        {cities?.map((cityItem: ICityItem) => (
          <Grid
            item
            key={cityItem._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ padding: "1rem" }}
          >
            <Link
              href={`/cities/${cityItem.city.label.toLowerCase()}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <CityItem data={cityItem} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
