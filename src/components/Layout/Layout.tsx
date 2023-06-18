import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "../../config/theme";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { Box, ThemeProvider, createTheme } from "@mui/material";

export const Layout = ({ children }: any) => {
  const mode = useSelector((state: any) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Header />
        {children}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
