import Link from "next/link";
import Image from "next/image";
import css from "./Home-page.module.scss";
import { Box, Typography } from "@mui/material";

export const HomePage = ({ data }) => {
  return (
    <main className={css.main}>
      <div className={css.home_body}>
        {data.cities
          .filter((city) => city.showOnHomePage)
          .map((ev) => (
            <Box
              key={ev._id}
              sx={{ display: "flex", border: "1px solid gray" }}
            >
              <Link
                href={`/events/${ev.city.toLowerCase()}`}
                className={css.card}
              >
                <div className={css.image}>
                  <Image
                    src={ev.imagePath}
                    alt={ev.title}
                    width={800}
                    height={500}
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </Link>
              <div className={css.content}>
                <h2>{ev.title}</h2>
                <p>{ev.description}</p>
                <p>Total events on this city: {ev.totalEvents}</p>
                <p>total people on this city: {ev.population}</p>
                <p>country: {ev.country}</p>
                <Box sx={{ border: "1px solid gray", padding: "1rem" }}>
                  <Typography variant="h4">This is event</Typography>
                  <p>date: {ev.upcomingEvent?.date}</p>
                  <p>description: {ev.upcomingEvent?.description}</p>
                  <img src={ev.upcomingEvent?.imagePath} width={100} />
                  <p>seats: {ev.upcomingEvent?.seats}</p>
                  <p>title: {ev.upcomingEvent?.title}</p>
                </Box>
              </div>
            </Box>
          ))}
      </div>
    </main>
  );
};
