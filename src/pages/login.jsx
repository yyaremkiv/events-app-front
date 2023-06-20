import { useDispatch } from "react-redux";
import { Box, Typography, useMediaQuery, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { FormLogin } from "../components/FormLogin/FormLogin";
import { setModeTheme } from "../redux/theme/themeSlice";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.5rem",
          border: "1px solid gray",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "0.5rem",
          }}
        >
          <Typography
            fontWeight="500"
            variant="h5"
            sx={{ width: "100%", textAlign: "center" }}
          >
            Welcome to EventApp!
          </Typography>

          <IconButton onClick={() => dispatch(setModeTheme())}>
            {true === "dark" ? (
              <DarkMode sx={{ color: "gray", fontSize: "1.5rem" }} />
            ) : (
              <LightMode sx={{ color: "gray", fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </Box>
        <FormLogin />
      </Box>
    </Box>
  );
};

export default useAuth(Login);
