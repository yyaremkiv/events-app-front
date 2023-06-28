import { useState, useEffect } from "react";
import { EventService } from "../services";
import { IEventItem, IQueryParams } from "../interfaces";

interface ICitiesData {
  cities: IEventItem[];
  totalCities: number;
}

interface IUseFetchCitiesProps {
  params: IQueryParams["params"];
  loadMore?: boolean;
}

export type TypeFetchCitiesResult = [
  ICitiesData,
  boolean,
  string | null,
  (props: IUseFetchCitiesProps) => Promise<void>
];

export const useFetchCities = ({
  params,
  loadMore = false,
}: IUseFetchCitiesProps): TypeFetchCitiesResult => {
  const [data, setData] = useState<ICitiesData>({ cities: [], totalCities: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ params, loadMore }: IUseFetchCitiesProps) => {
    setIsLoading(true);
    try {
      const response = await EventService.getCities({ params });

      if (loadMore) {
        setData({
          cities: [...data.cities, ...response.data.cities],
          totalCities: response.data.totalCities,
        });
      } else {
        setData({
          cities: response.data.cities,
          totalCities: response.data.totalCities,
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ params, loadMore });
  }, []);

  return [data, isLoading, error, fetchData];
};
