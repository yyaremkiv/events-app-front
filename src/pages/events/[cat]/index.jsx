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
    console.log("ev", ev.city.toLowerCase());
    return {
      params: {
        cat: ev.city.toLowerCase(),
      },
    };
  });
  return {
    paths: AllPath,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("context", context);
  const city = context?.params.cat;
  const { data } = await EventService.getEvent(city);
  console.log("this is console.log", data);

  return { props: { data } };
}
