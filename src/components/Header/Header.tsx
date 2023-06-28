import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { AuthOperations } from "../../redux/auth/auth.operations";
import { ThemeToggle } from "../index";
import { AppDispatch, RootState } from "../../redux/store";
import { CustomButton } from "../index";

export const Header = (): JSX.Element => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  return (
    <header>
      <Box
        sx={{
          background: theme.palette.background.gradientHeaderBg,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h2"
              fontSize="42px"
              fontWeight="700"
              sx={{ textTransform: "uppercase", padding: "20px 0px" }}
            >
              Events
            </Typography>

            <ThemeToggle />

            {isLogged ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <AccountCircle fontSize="large" />
                  <Typography variant="subtitle1">Hello, Admin!</Typography>
                </Box>

                <IconButton onClick={() => dispatch(AuthOperations.logout())}>
                  <Logout />
                </IconButton>

                <CustomButton
                  text="Logout"
                  onClick={() => {
                    dispatch(AuthOperations.logout());
                  }}
                  startIcon={<Logout />}
                  styles={{
                    backgroundColor: theme.palette.text.primary,
                    color: theme.palette.background.default,
                    borderRadius: "20px",
                    padding: "7px 20px",
                    "&:hover": {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </header>
  );
};
