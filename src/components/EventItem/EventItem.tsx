import Image from "next/image";
import { IEventItem } from "../../interfaces";
import { SpeakersLine } from "./SpeakersLine";
import { EventInfoItem } from "./EventInfoItem";
import {
  Box,
  Chip,
  Typography,
  useTheme,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";

import {
  Event,
  Chair,
  Sell,
  LabelImportant,
  Timelapse,
  InterpreterMode,
  AutoAwesome,
  Description,
  GTranslate,
  Public,
  Place,
} from "@mui/icons-material";

interface IEventItemProps {
  event: IEventItem;
  isLoading?: boolean;
}

export const EventItem = ({
  event,
  isLoading = false,
}: IEventItemProps): JSX.Element => {
  // const { title, description, imagePath, date, seats, categories, speakers } =
  //   event;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ overflow: "hidden", marginBottom: "100px" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "60px",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: "0.5rem",
          padding: "10px 0",
          color: theme.palette.text.primary,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {event.title}
      </Typography>

      <Grid
        container
        sx={{
          marginBottom: "30px",
        }}
      >
        {event.imagePath ? (
          <Grid item lg={6} md={12} sm={12} sx={{ padding: "1rem 0" }}>
            <Image
              src={event.imagePath}
              width={400}
              height={300}
              alt={event.title}
              style={{
                width: "100%",
                height: "auto",
                margin: "0 auto",
                display: "block",
              }}
              priority={true}
            />
          </Grid>
        ) : null}

        <Grid
          item
          lg={6}
          md={12}
          sm={12}
          sx={{
            padding: "1rem 2rem",
            color: theme.palette.text.light,
            margin: "0 auto",
          }}
        >
          <EventInfoItem
            text="Country: "
            info="Warsaw"
            ComponentIcon={
              <Place
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="City: "
            info="Poland"
            ComponentIcon={
              <Public
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="When: "
            info={event.date}
            ComponentIcon={
              <Event
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Seats: "
            info={event.seats}
            ComponentIcon={
              <Chair
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Price: "
            info={event.price}
            ComponentIcon={
              <Sell
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Time: "
            info="180 min"
            ComponentIcon={
              <Timelapse
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Speakers: "
            info={
              event.speakers
                ? event.speakers.map((speaker: any) => (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        margin: "0",
                        padding: "0",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        width: "fit-content",
                        display: "inline-block",
                      }}
                    >
                      {` ${speaker.firstname} ${speaker.lastname} / `}
                    </Typography>
                  ))
                : null
            }
            ComponentIcon={
              <InterpreterMode
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Language: "
            info="Polish, English"
            ComponentIcon={
              <GTranslate
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <EventInfoItem
            text="Age: "
            info="10+"
            ComponentIcon={
              <AutoAwesome
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            }
          />

          <Grid container>
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <LabelImportant
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "20px", fontWeight: "300" }}
              >
                Category:
              </Typography>
            </Grid>

            <Grid
              item
              lg={8}
              md={8}
              sm={8}
              sx={{
                padding: "0.2rem 1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "3px 7px",
              }}
            >
              {event.categories
                ? event.categories.map((cat: any) => (
                    <Chip
                      label={cat.label}
                      sx={{
                        backgroundColor: cat.color,
                        minWidth: "100px",
                        padding: "10px",
                        color: theme.palette.text.white,
                        fontSize: "16px",
                      }}
                    />
                  ))
                : null}
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <EventInfoItem
              text="Description: "
              info={""}
              ComponentIcon={
                <Description
                  fontSize="medium"
                  sx={{ color: theme.palette.primary.main }}
                />
              }
            />
            <Typography
              variant="subtitle1"
              sx={{
                padding: "0.5rem",
                fontSize: "18px",
                fontWeight: "400",
                color: theme.palette.text.grey,
                textAlign: "justify",
              }}
            >
              {event.description +
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore possimus incidunt similique voluptates ipsum aperiam saepe minima consequatur deleniti sunt adipisci nulla repudiandae laborum, consequuntur itaque neque a. Minus, facilis."}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Box>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "32px",
            margin: "0 auto",
            display: "block",
            padding: "14px 42px",
            fontSize: "28px",
            marginBottom: "40px",
            background: theme.palette.background.gradientBtn,
            color: theme.palette.text.white,
          }}
        >
          Register On Event
        </Button>
      </Box>

      <Typography
        variant="h3"
        sx={{
          padding: "2rem 1rem",
          marginBottom: "10px",
          color: theme.palette.text.primary,
        }}
      >
        Speakers and hosts of this event:
      </Typography>

      <SpeakersLine speakers={event.speakers} />
    </Box>
  );
};
