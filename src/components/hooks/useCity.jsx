import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CityOperations from "@/redux/cities/city.operations.js";

export const useGetCity = () => {
  const cities = useSelector((state) => state.city.cities);
  const isLoading = useSelector((state) => state.city.isLoading);
  const error = useSelector((state) => state.city.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CityOperations.getCity());
  }, []);

  return [cities, isLoading, error];
};
