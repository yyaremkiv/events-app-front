import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { EventService } from "../services";
import { IQueryCityParams, ICityDataResponse } from "../interfaces";

interface IUseFetchCitiesProps {
  params: IQueryCityParams;
  loadMore?: boolean;
}

interface IInitialData {
  cities: [];
  totalCities: null;
  searchParams: null;
}

const initialDataValues: IInitialData = {
  cities: [],
  totalCities: null,
  searchParams: null,
};

export type TypeFetchCitiesResult = [
  ICityDataResponse | IInitialData,
  boolean,
  string | null,
  (props: IUseFetchCitiesProps) => Promise<void>
];

export const useFetchCities = ({
  params,
  loadMore = false,
}: IUseFetchCitiesProps): TypeFetchCitiesResult => {
  const [data, setData] = useState<ICityDataResponse | IInitialData>(
    initialDataValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ params, loadMore }: IUseFetchCitiesProps) => {
    setIsLoading(true);
    try {
      const response = await EventService.getCities(params);

      if (loadMore && data) {
        setData({
          cities: [...data.cities, ...response.data.cities],
          totalCities: response.data.totalCities,
          searchParams: response.data.searchParams,
        });
      } else {
        setData({
          cities: response.data.cities,
          totalCities: response.data.totalCities,
          searchParams: response.data.searchParams,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ params, loadMore });
  }, []);

  return [data, isLoading, error, fetchData];
};
