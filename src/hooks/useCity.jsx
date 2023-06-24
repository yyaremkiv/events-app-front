import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventOperations } from "../redux/event/event.operations";

export const useCity = () => {
  const cities = useSelector((state) => state.events.cities);
  const isLoading = useSelector((state) => state.events.isLoading);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EventOperations.getCity({}));
  }, []);

  return [cities, isLoading, error];
};
