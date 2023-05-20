import Link from "next/link";
import Image from "next/image";
import css from "./catEvent.module.scss";
import { Box, Chip, Container, Typography } from "@mui/material";

export const CatEvent = ({ data, cityNameLink }) => {
  return (
    <Container>
      <Box className={css.content}>
        {data?.map(
          ({ id, title, imagePath, description, date, seats, categories }) => (
            <Link
              key={id}
              href={`/events/${cityNameLink.toLowerCase()}/${title}`}
              className={css.card}
              style={{ border: "1px solid red" }}
            >
              <Image
                src={imagePath}
                alt={title}
                width={300}
                height={300}
                priority={true}
                style={{ width: "auto", height: "auto" }}
              />
              <Typography variant="h4">Title: {title}</Typography>
              <Typography>Descrition: {description}</Typography>
              <Typography>Data: {date}</Typography>
              <Typography>Seats: {seats}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {categories.map((cat, index) => (
                  <Chip key={index} label={cat} variant="outlined" />
                ))}
              </Box>
            </Link>
          )
        )}
      </Box>
    </Container>
  );
};
