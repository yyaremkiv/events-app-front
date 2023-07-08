import Image from "next/image";
import { IEventItem } from "../../interfaces";
import { Box, Typography, useTheme } from "@mui/material";
import { Place, Celebration as CelebrationIcon } from "@mui/icons-material";
import { formatDateString } from "@/src/config";

interface IEventCardItemProps {
  data: IEventItem;
}

export const EventCardItem = ({ data }: IEventCardItemProps): JSX.Element => {
  const { title, imagePath, description, date, seats } = data;
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: "1rem",
        overflow: "hidden",
        background: theme.palette.background.gradientCard,
        color: theme.palette.text.primary,
        transition: "transform 300ms linear",
        "&:hover": { transform: "scale(1.02)" },
        "&:hover h6": { color: "white", opacity: 1 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "500px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={imagePath}
          alt={title}
          fill={true}
          priority={true}
          style={{
            margin: "auto",
            display: "block",
            objectFit: "cover",
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          sizes="(max-width: 768px) 25vw, (max-width: 1800px) 40vw, 33vw"
        />
        <Box
          sx={{
            padding: "10px",
            textAlign: "center",
            minHeight: "80px",
            opacity: "1",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              background: theme.palette.background.gradientCard,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                fontSize: "16px",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Place fontSize="medium" />
                <Typography variant="h5" sx={{ fontSize: "inherit" }}>
                  {formatDateString(date)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <CelebrationIcon fontSize="medium" />
                <Typography variant="h5" sx={{ fontSize: "inherit" }}>
                  {`Seats: ${seats}`}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h3"
              sx={{
                padding: "7px",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        {description ? (
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              zIndex: 10,
              padding: "7px",
              textAlign: "center",
              transition: "opacity 200ms linear, color 200ms linear",
              opacity: 0,
              backgroundColor: "#00000050",
            }}
          >
            {description}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};
