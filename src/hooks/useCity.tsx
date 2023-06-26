import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventOperations } from "../redux/event/event.operations";
import { RootState, AppDispatch } from "../redux/store";

export type FetchCitiesResult = [any, boolean, string | null];

export const useCity = (): FetchCitiesResult => {
  const cities = useSelector((state: RootState) => state.events.cities);
  const isLoading = useSelector((state: RootState) => state.events.isLoading);
  const error = useSelector((state: RootState) => state.events.error);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(EventOperations.getCity({}));
  }, []);

  return [cities, isLoading, error];
};
