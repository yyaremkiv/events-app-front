import Image from "next/image";
import Link from "next/link";
import { AllEvents } from "@/components/Events/events-page";

const EvantsPage = ({ data }) => {
  return <AllEvents data={data} />;
};

export default EvantsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
