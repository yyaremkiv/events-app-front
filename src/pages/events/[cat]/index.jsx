import { useSelector } from "react-redux";
import { CatEvent } from "@/components/Events/catEvent";
import EventService from "@/services/event.service";
import { Box } from "@mui/system";

const EventsCatPage = ({ data, pageName }) => {
  return (
    <Box>
      <CatEvent data={data} pageName={pageName} />
    </Box>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const cities = await EventService.getCity();
  const AllPath = cities.data.map((ev) => {
    return {
      params: {
        cat: ev._id.toString(),
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
  const { data } = await EventService.getEvent(id);

  return { props: { data, pageName: id } };
}
