import Link from "next/link";
import Image from "next/image";
import css from "./catEvent.module.scss";

export const CatEvent = ({ data, pageName }) => {
  const { cityId } = data;

  return (
    <div className={css.cat_events}>
      <h1> Events in {pageName}</h1>
      <div className={css.content}>
        {data?.events?.map((ev) => (
          <Link
            key={ev.id}
            href={`/events/${cityId}/${ev.id}`}
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
