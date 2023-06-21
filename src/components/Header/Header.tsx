import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import AuthActions from "../../redux/auth/AuthOperations";
import { ThemeToggle } from "../index";

export const Header = (): JSX.Element => {
  const isLogged = useSelector((state: any) => state.auth.isLogged);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <header>
      <Box sx={{ backgroundColor: "#BDE7D9" }}>
        <Container>
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

                <Button
                  // @ts-ignore
                  onClick={() => dispatch(AuthActions.logout())}
                  startIcon={<Logout />}
                  sx={{ backgroundColor: "black" }}
                >
                  Logout
                </Button>
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </header>
  );
};
