import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "../index";
import { MenuNavigationLink } from "../MenuNavigationLink";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const Header = (): JSX.Element => {
  const isNonMobileScreens = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  return (
    <header>
      <Box
        sx={{
          background: theme.palette.background.gradientHeaderBg,
          color: theme.palette.text.primary,
        }}
      >
        {isNonMobileScreens ? (
          <Container maxWidth="xl">
            <MobileMenu />
          </Container>
        ) : (
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

              <MenuNavigationLink />

              <ThemeToggle />
            </Box>
          </Container>
        )}
      </Box>
    </header>
  );
};
