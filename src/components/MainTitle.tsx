import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import textBackground from "../image/bg2.jpg";

interface IMainTitleProps {
  title: string;
  subtitle?: string;
  showArrow?: boolean;
}

export const MainTitle = ({
  title,
  subtitle,
  showArrow = true,
}: IMainTitleProps): JSX.Element => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "800",
          textAlign: "center",
          fontSize: isMobileScreen ? "80px" : "120px",
          marginBottom: "1rem",
          textTransform: "uppercase",
          color: "transparent",
          WebkitTextStroke: `1px ${theme.palette.text.primary}`,
          backgroundImage: `url(${textBackground.src})`,
          WebkitBackgroundClip: "text",
          backgroundPosition: "0 0",
          animation: "back 30s linear infinite",

          "@keyframes back": {
            "100%": { backgroundPosition: "2000px 0" },
          },
        }}
      >
        {title}
      </Typography>

      {!!subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            padding: "0 50px",
            color: theme.palette.text.primary,
            marginBottom: "50px",
          }}
        >
          {subtitle}
        </Typography>
      )}

      {showArrow && (
        <Box
          sx={{
            paddingBottom: "1rem",
            width: "100px",
            height: "100px",
            margin: "0 auto",
            position: "relative",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "70px",
              height: "70px",
              borderBottom: `15px solid ${theme.palette.text.primary}`,
              borderRight: `15px solid ${theme.palette.text.primary}`,
              transform: "rotate(45deg) translate(-50%, -50%)",
              animation: "arrow 2s linear infinite",

              "@keyframes arrow": {
                "0%": { top: "10px", opacity: "0" },
                "50%": { opacity: "1" },
                "100%": { top: "50px", opacity: "0" },
              },
            },
          }}
        ></Box>
      )}
    </Box>
  );
};
