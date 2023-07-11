import { Box, Typography, useTheme } from "@mui/material";

export const SpeakerItem = ({
  id,
  firstname,
  lastname,
  age,
  topic,
  about,
}: any) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "fit-content",
          minHeight: "400px",
          height: "auto",
          background: theme.palette.background.lightBlue,
          borderRadius: "0 20px 0 20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          flexWrap: "wrap",
          boxShadow: `2px 2px 5px ${theme.palette.text.primary}`,
        }}
      >
        <Box
          key={id}
          sx={{
            background: theme.palette.background.gradientBg2,
            padding: "10px 15px",
            borderRadius: "0 20px 0 20px",
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              border: `1px solid ${theme.palette.text.primary}`,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "url(https://hips.hearstapps.com/rover/profile_photos/67055711-c808-4a4d-811a-e7155a2bce10_1667409691.file)",
                backgroundSize: "contain",
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 auto",
              }}
            >
              <Typography>{firstname}</Typography>
              <Typography>{lastname}</Typography>
            </Box>

            <Box sx={{ margin: "0 auto" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  width: "fit-content",
                  padding: "5px 10px",
                  border: `1px solid ${theme.palette.primary.light}`,
                  borderRadius: "50%",
                  textAlign: "center",
                }}
              >
                {age}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            color: theme.palette.text.light,
            width: "100%",
          }}
        >
          {topic && (
            <Box
              sx={{
                padding: "20px",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Main Topic:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                  borderBottom: `1px solid ${theme.palette.primary.light}`,
                  paddingBottom: "10px",
                }}
              >
                {topic}
              </Typography>
            </Box>
          )}
          {about && (
            <Box sx={{ padding: "10px 20px" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  fontWeight: "300",
                  padding: "10px",
                  maxWidth: "300px",
                  borderRadius: "0 20px 0 20px",
                  backgroundColor: theme.palette.background.light,
                }}
              >
                {about}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
