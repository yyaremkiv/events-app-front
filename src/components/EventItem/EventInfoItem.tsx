import { Typography, Grid, useTheme } from "@mui/material";

export const EventInfoItem = ({ text, info, ComponentIcon }: any) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        padding: "2px",
      }}
    >
      <Grid
        item
        lg={4}
        md={4}
        sm={4}
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {ComponentIcon}
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "18px", fontWeight: "300" }}
        >
          {text}
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} sx={{ padding: "0rem 1rem" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "18px",
            fontWeight: "500",
            color: theme.palette.primary.main,
          }}
        >
          {info ? info : null}
        </Typography>
      </Grid>
    </Grid>
  );
};
