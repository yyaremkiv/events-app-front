import { CatEvent } from "@/components/Events/catEvent";

const EventsCatPage = ({ data, pageName }) => {
  return <CatEvent data={data} pageName={pageName} />;
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("../../../../data/data.json");
  const AllPath = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  return {
    paths: AllPath,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("../../../../data/data.json");

  const data = allEvents.filter((ev) => ev.city === id);
  return { props: { data, pageName: id } };
}
