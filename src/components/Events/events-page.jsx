import Link from "next/link";
import Image from "next/image";
import css from "./events-page.module.scss";

export const AllEvents = ({ data }) => {
  return (
    <div className={css.events_page}>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} className={css.card}>
          <div style={{ height: "30%", border: "1px solid tomato" }}>
            <Image src={ev.image} alt={ev.title} width={400} height={200} />
          </div>
          <h2>{ev.title}</h2>
        </Link>
      ))}
    </div>
  );
};
