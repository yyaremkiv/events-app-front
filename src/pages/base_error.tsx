import Link from "next/link";
import { Button, Container, Typography, useTheme } from "@mui/material";

const Custom404 = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ paddingBottom: "2rem" }}>
        Oops! The page you're looking for does not exist.
      </Typography>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Button
          sx={{
            padding: "0.5rem 2rem",
            textDecoration: "none",
            borderRadius: "20px",
          }}
          variant="outlined"
        >
          Go To Home Page
        </Button>
      </Link>
    </Container>
  );
};

export default Custom404;
