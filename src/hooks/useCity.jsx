import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CityOperations from "@/redux/cities/city.operations.js";

export const useGetCity = () => {
  const cities = useSelector((state) => state.events.cities);
  const isLoading = useSelector((state) => state.events.isLoading);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CityOperations.getCity({}));
  }, []);

  return [cities, isLoading, error];
};
