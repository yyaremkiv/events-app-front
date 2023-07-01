import Image from "next/image";
import Link from "next/link";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Place, Celebration as CelebrationIcon } from "@mui/icons-material";
import { CityItem } from "../CityItem/CityItem";

interface ICityListProps {
  data: any;
  totalCities: number;
}

export const CityList = ({
  data,
  totalCities,
}: ICityListProps): JSX.Element => {
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
        {data?.map(({ _id, city, country, title, imagePath }: any) => (
          <Grid
            item
            key={_id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ padding: "1rem" }}
          >
            <Link
              href={`/cities/${city.label.toLowerCase()}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <CityItem
                imagePath={imagePath}
                title={title}
                leftPoint={country.label}
                rightPoint={`Events: ${totalCities}`}
                mainTitle={city.label}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
