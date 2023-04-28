import { useState } from "react";
import axios from "axios";

import { FormCity } from "@/components/FormCity/FormCity";
import { ListCity } from "@/components/ListCity.admin";

import EventService from "@/services/EventService";

const Admin = ({ data }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [population, setPopulation] = useState("");
  const [list, setList] = useState([]);

  const handleAddCity = async (formData) => {
    const { data } = await EventService.addCity(formData);
    console.log("data", data);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "4rem", padding: "2rem" }}>
        <ListCity data={data} />
        <FormCity handleAddCity={handleAddCity} />
      </div>
    </div>
  );
};

export default Admin;

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:4000/events/city");
  return {
    props: {
      data,
    },
  };
}
