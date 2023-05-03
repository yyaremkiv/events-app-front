import { AllEvents } from "@/components/Events/events-page";
import EventService from "@/services/EventService";

const EvantsPage = ({ data }) => {
  return <AllEvents data={data} />;
};

export default EvantsPage;

export async function getStaticProps() {
  const { data } = await EventService.getCity();

  if (!data) {
    return null;
  }

  return {
    props: {
      data,
    },
  };
}
