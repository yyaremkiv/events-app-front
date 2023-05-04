import Link from "next/link";
import Image from "next/image";
import css from "./Home-page.module.scss";

export const HomePage = ({ data }) => {
  return (
    <main className={css.main}>
      <div className={css.home_body}>
        {data
          .filter((city) => city.showOnHomePage)
          .map((ev) => (
            <Link
              key={ev._id}
              href={`/events/${ev._id}`}
              className={css.card}
              style={{ border: "1px solid green" }}
            >
              <div className={css.image}>
                <Image
                  src={ev.imagePath}
                  alt={ev.title}
                  width={300}
                  height={300}
                />
              </div>
              <div className={css.content}>
                <h2>{ev.title}</h2>
                <p>{ev.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};
