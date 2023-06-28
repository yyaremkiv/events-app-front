import Image from "next/image";
import Link from "next/link";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Place, Celebration as CelebrationIcon } from "@mui/icons-material";

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
        padding: "20px 0",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container gap={2}>
        {data?.map(({ _id, city, country, title, imagePath }: any) => (
          <Grid
            item
            key={_id}
            xs={12}
            sm={6}
            md={4}
            lg={3.8}
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              transition: "transform 300ms linear",
              background: theme.palette.background.gradientCard,
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: " 0px 1px 7px 0px rgba(36,188,196,0.75)",
              },
            }}
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
              <Box
                sx={{
                  width: "100%",
                  height: "400px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={imagePath}
                  alt={title}
                  fill={true}
                  priority={true}
                  style={{
                    margin: "auto",
                    display: "block",
                    objectFit: "cover",
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  sizes="(max-width: 768px) 25vw, (max-width: 1800px) 40vw, 33vw"
                />
              </Box>

              <Box
                sx={{
                  padding: "20px 16px",
                  textAlign: "center",
                  minHeight: "120px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Place fontSize="medium" />
                    <Typography variant="h5" sx={{ fontSize: "inherit" }}>
                      {country.label}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <CelebrationIcon fontSize="medium" />
                    <Typography variant="h5" sx={{ fontSize: "inherit" }}>
                      Events: {totalCities}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h3"
                  sx={{ fontSize: "24px", fontWeight: "600" }}
                >
                  {city.label}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
