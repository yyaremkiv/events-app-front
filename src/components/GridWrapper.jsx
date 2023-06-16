import React from "react";
import { Grid } from "@mui/material";

export const GridWrapper = ({ children, isEven }) => {
  return (
    <Grid container rowSpacing={2}>
      {isEven ? (
        <>
          <Grid item xs={12} md={6}>
            {children[0]}
          </Grid>
          <Grid item xs={12} md={6}>
            <p>{children[1]}</p>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <p>{children[1]}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            {children[0]}
          </Grid>
        </>
      )}
    </Grid>
  );
};
