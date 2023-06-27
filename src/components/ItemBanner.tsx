import { Box, Container, Typography } from "@mui/material";

export const ItemBanner = ({ title, subtitle }: any) => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          borderBottom: "1px solid black",
          borderTop: "1px soliid black",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <Box sx={{ padding: "50px 10px", textAlign: "left", width: "50%" }}>
          <Typography variant="h1" sx={{ fontSize: "68px", fontWeight: "700" }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "20px" }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
