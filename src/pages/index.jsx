import { HomePage } from "@/components/Home/Home.page";
import EventService from "@/services/event.service";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  const { data } = await EventService.getCity({ limit: 10 });

  return {
    props: {
      data: data,
    },
  };
}
