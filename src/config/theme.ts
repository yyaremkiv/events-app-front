import { PaletteMode, createTheme } from "@mui/material";

declare module "@mui/material" {
  interface TypeBackground {
    light: string;
    main: string;
    mainHover: string;
  }
  interface TypeText {
    light: string;
    main: string;
    dark: string;
  }
}

export const themeSettings = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#26a69a",
        light: "#00acc1",
        dark: "#006064",
      },
      secondary: {
        light: "#ff7961",
        main: "#ff3d00",
        dark: "#dd2c00",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#fff",
        paper: mode === "dark" ? "#121212" : "#fff",
        light: mode === "dark" ? "#212121" : "#fafafa",
        main: "#26a69a",
        mainHover: "#00796b",
      },
      text: {
        main: mode === "dark" ? "#26a69a" : "#26a69a",
        primary: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
        light: mode === "dark" ? "#fff" : "#fff",
        dark: mode === "dark" ? "#616161" : "#757575",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 600,
        lg: 1024,
        xl: 1680,
      },
    },
  });
};
