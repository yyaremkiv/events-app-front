import { Box, Typography, useTheme } from "@mui/material";

interface IMainTitleProps {
  title: string;
  showArrow?: boolean;
}

export const MainTitle = ({
  title,
  showArrow = true,
}: IMainTitleProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "20px 0",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "800",
          textAlign: "center",
          fontSize: "120px",
          marginBottom: "46px",
          textTransform: "uppercase",
          color: "transparent",
          WebkitTextStroke: `1px ${theme.palette.text.primary}`,
          backgroundImage:
            "url('https://www.fonstola.ru/images/201202/fonstola.ru_74847.jpg')",
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
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          padding: "0 50px",
          color: theme.palette.text.primary,
          marginBottom: "50px",
        }}
      >
        Welcome to our website, where you can find information about various
        exciting events happening around the world. Here, you can explore a
        diverse range of events, from concerts and exhibitions to sports
        competitions and cultural festivals. On our website, you will discover
        an up-to-date event calendar featuring detailed descriptions, dates,
        venues, and other valuable information. Browse through our event
        listings, choose what interests you, and join in on the thrilling
        experiences that will leave a lasting impression.
      </Typography>

      {showArrow && (
        <Box
          sx={{
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
                "0%": {
                  top: "10px",
                  opacity: "0",
                },
                "50%": {
                  opacity: "1",
                },
                "100%": {
                  top: "50px",
                  opacity: "0",
                },
              },
            },
          }}
        ></Box>
      )}
    </Box>
  );
};
