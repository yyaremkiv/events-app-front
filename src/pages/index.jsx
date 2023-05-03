import { HomePage } from "@/components/Home/Home-page";
import axios from "axios";
import EventService from "@/services/EventService";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  const { data } = await EventService.getCity();

  return {
    props: {
      data: data,
    },
  };
}
