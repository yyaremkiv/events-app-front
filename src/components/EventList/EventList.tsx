import Link from "next/link";
import { EventCardItem } from "./EventCardItem";
import { IEventItem } from "../../interfaces";
import { Grid } from "@mui/material";

interface IEventListProps {
  events: IEventItem[];
  cityName: string;
}

export const EventList = ({
  events,
  cityName,
}: IEventListProps): JSX.Element => {
  return (
    <Grid container spacing={3}>
      {events.map((event: IEventItem) => (
        <Grid key={event.id} item xs={12} md={6} lg={4}>
          <Link
            href={`/cities/${cityName.toLowerCase()}/${event.title.toLowerCase()}`}
          >
            <EventCardItem data={event} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
