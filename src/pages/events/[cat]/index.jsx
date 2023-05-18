import { useSelector } from "react-redux";
import { CatEvent } from "@/components/Events/catEvent";
import EventService from "@/services/event.service";
import { Box } from "@mui/system";
import { MenuNavigation } from "@/components/MenuNavigation";

const EventsCatPage = ({ data, pageName }) => {
  return (
    <Box>
      <MenuNavigation />
      <CatEvent data={data} pageName={pageName} />
    </Box>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const cities = await EventService.getCity({ limit: 10 });
  const AllPath = cities.data.cities.map((ev) => {
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
