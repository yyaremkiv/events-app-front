import { HomePage } from "@/components/Home/Home-page";
import axios from "axios";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:4000/events");
  return {
    props: {
      data: data,
    },
  };
}
