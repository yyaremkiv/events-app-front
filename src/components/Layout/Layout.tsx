import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "../../config/theme";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import { MenuNavigation } from "../MenuNavigation";

export const Layout = ({ children }: any) => {
  const mode = useSelector((state: any) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Header />
        <Container sx={{ flexGrow: 1 }}>
          <MenuNavigation />
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
