import { Box, Typography } from "@mui/material";

interface ItemIconTextProps {
  text: string;
  Component?: JSX.Element;
}

export const ItemIconText = ({ text, Component }: ItemIconTextProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {Component}
      <Typography variant="h6" sx={{ color: "inherit" }}>
        {text}
      </Typography>
    </Box>
  );
};
