import { useEffect, useState } from "react";
import { AllEvents } from "@/components/Events/events-page";
import EventService from "@/services/event.service";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EvantsPage = ({ data }) => {
  const [eventList, setEventList] = useState([...data.cities]);
  const [countEventShow, setCountEventShow] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await EventService.getCity({ limit: countEventShow });
        if (data) setEventList(data);
      } catch (err) {
        setError(err?.response?.data.message || "Network error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [countEventShow]);

  return (
    <Box>
      <Box sx={{ border: "1px solid gray" }}>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label">Count</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={countEventShow}
            label="Count"
            onChange={(e) => setCountEventShow(e.target.value)}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
      sfsdfsdfsdfd
      <AllEvents data={eventList} />;
    </Box>
  );
};

export default EvantsPage;

export async function getStaticProps() {
  const { data } = await EventService.getCity({ limit: 10 });

  if (!data) {
    return null;
  }

  return {
    props: {
      data,
    },
  };
}
