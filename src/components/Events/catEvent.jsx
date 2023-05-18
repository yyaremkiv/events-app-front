import Link from "next/link";
import Image from "next/image";
import css from "./catEvent.module.scss";

export const CatEvent = ({ data }) => {
  console.log("CatEvent", data);
  const { city } = data;

  return (
    <div className={css.cat_events}>
      <div className={css.content}>
        {data?.events.events?.map((ev) => (
          <Link
            key={ev.id}
            href={`/events/${city.toLowerCase()}/${ev.title}`}
            className={css.card}
            style={{ border: "1px solid red" }}
          >
            <Image src={ev.imagePath} alt={ev.title} width={300} height={300} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
