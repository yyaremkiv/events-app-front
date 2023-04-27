import { HomePage } from "@/components/Home/Home-page";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
