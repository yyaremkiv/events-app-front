import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import css from "./events-page.module.scss";

export const AllEvents = ({ data }) => {
  return (
    <Box sx={{ margin: "0 auto", width: "75%" }}>
      {data.map(({ _id, title, imagePath }) => (
        <Link key={_id} href={`/events/${_id}`} className={css.card}>
          <div style={{ height: "30%", border: "1px solid green" }}>
            <Image src={imagePath} alt={title} width={400} height={200} />
          </div>
          <h2>{title}</h2>
        </Link>
      ))}
    </Box>
  );
};
