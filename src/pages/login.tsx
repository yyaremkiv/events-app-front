import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormLogin } from "../components/FormLogin/FormLogin";
import { useAuth } from "../hooks/useAuth";

const Login = (): JSX.Element => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        padding: "2rem 0",
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          width: isMobileScreens ? "100%" : "75%",
          maxWidth: "600px",
          border: isMobileScreens ? "none" : "1px solid gray",
          borderRadius: "1.5rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", paddingBottom: "1rem" }}
        >
          Welcome to EventApp!
        </Typography>
        <FormLogin />
      </Box>
    </Container>
  );
};

export default useAuth(Login);
