import Link from "next/link";
import Image from "next/image";
import css from "./events-page.module.scss";

export const AllEvents = ({ data }) => {
  console.log("this is console.log", data);
  return (
    <div className={css.events_page}>
      {data.map(({ _id, title, imagePath }) => (
        <Link key={_id} href={`/events/${_id}`} className={css.card}>
          <div style={{ height: "30%", border: "1px solid green" }}>
            <Image src={imagePath} alt={title} width={400} height={200} />
          </div>
          <h2>{title}</h2>
        </Link>
      ))}
    </div>
  );
};
