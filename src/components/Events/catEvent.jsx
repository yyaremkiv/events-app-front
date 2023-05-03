import Link from "next/link";
import Image from "next/image";
import css from "./catEvent.module.scss";

export const CatEvent = ({ data, pageName }) => {
  console.log("data", data);
  return (
    <div className={css.cat_events}>
      <h1> Events in {pageName}</h1>
      <div className={css.content}>
        {data[0].events?.map((ev) => (
          <Link
            key={ev.id}
            href={`/events/${ev.city}/${ev.id}`}
            className={css.card}
          >
            <Image src={ev.image} alt={ev.title} width={300} height={300} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
