import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventOperations } from "../redux/event/event.operations";
import { RootState, AppDispatch } from "../redux/store";
import { ICityItem } from "../interfaces";

interface IUseCityFromReduxProps {
  page: number;
  limit: number;
}

export type FetchUseCityFromReduxResult = [
  ICityItem[],
  number | null,
  boolean,
  string | null,
  any
];

export const useCityFromRedux = ({
  page,
  limit,
}: IUseCityFromReduxProps): FetchUseCityFromReduxResult => {
  const cities = useSelector((state: RootState) => state.events.cities);
  const totalCities = useSelector(
    (state: RootState) => state.events.totalCities
  );
  const isLoading = useSelector((state: RootState) => state.events.isLoading);
  const error = useSelector((state: RootState) => state.events.error);
  const dispatch: AppDispatch = useDispatch();

  const fetchData = (page: number, limit: number) => {
    dispatch(
      EventOperations.getCities({ params: { isHidden: true, page, limit } })
    );
  };

  useEffect(() => {
    fetchData(page, limit);
  }, []);

  return [cities, totalCities, isLoading, error, fetchData];
};
